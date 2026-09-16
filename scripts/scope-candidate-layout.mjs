#!/usr/bin/env node

import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname } from "node:path";

const [
  fullLayoutPath = "candidate-layout-extraction.v1.json",
  originalCandidatePath = "indexia-public-page.html",
  scopedCandidatePath = "evaluation/candidate-scoped/input/indexia-public-index.scope-1-425.json",
  scopedLayoutPath = "evaluation/candidate-scoped/input/candidate-layout-extraction.v1.json",
  maximumPageArgument = "425",
] = process.argv.slice(2);

const maximumPage = Number(maximumPageArgument);
if (!Number.isInteger(maximumPage) || maximumPage < 1) throw new Error("Maximum page must be a positive integer");

const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const fullLayoutBytes = readFileSync(fullLayoutPath);
const originalCandidateBytes = readFileSync(originalCandidatePath);
const fullLayout = JSON.parse(fullLayoutBytes);
const fullLines = fullLayout.pages.flatMap((page) => page.regions.flatMap((region) => region.lines));

if (sha256(originalCandidateBytes) !== fullLayout.candidate_sha256) {
  throw new Error("Original candidate bytes do not match the full layout candidate_sha256");
}

function expandEnd(startText, endText) {
  if (!endText) return Number(startText);
  let expanded = endText.length < startText.length ? `${startText.slice(0, startText.length - endText.length)}${endText}` : endText;
  if (Number(expanded) < Number(startText)) expanded = String(Number(expanded) + 10 ** endText.length);
  return Number(expanded);
}

function parseDisplayedLine(text) {
  const match = text.match(/^(.*?), ((?:\d+(?:–\d+)?)(?:, \d+(?:–\d+)?)*)$/u);
  if (!match) return { heading: text, tokens: [] };
  const tokens = match[2].split(", ").map((displayed) => {
    const [startText, endText] = displayed.split("–");
    const start = Number(startText);
    const end = expandEnd(startText, endText);
    if (!Number.isInteger(start) || !Number.isInteger(end) || start < 1 || end < start) {
      throw new Error(`Unsupported locator token: ${displayed}`);
    }
    return { displayed, start, end, atomicCount: end - start + 1 };
  });
  return { heading: match[1], tokens };
}

function abbreviatedEnd(first, last) {
  if (first >= 100 && Math.floor(first / 100) === Math.floor(last / 100)) return String(last % 100).padStart(2, "0");
  return String(last);
}

function filterLine(line) {
  const parsed = parseDisplayedLine(line.displayed_line_text);
  const retained = [];
  let retainedAtomicCount = 0;
  let rangesTrimmed = 0;
  for (const token of parsed.tokens) {
    if (token.start > maximumPage) continue;
    const retainedEnd = Math.min(token.end, maximumPage);
    retainedAtomicCount += retainedEnd - token.start + 1;
    if (token.end > maximumPage) {
      rangesTrimmed += 1;
      retained.push(token.start === retainedEnd ? String(token.start) : `${token.start}–${abbreviatedEnd(token.start, retainedEnd)}`);
    } else retained.push(token.displayed);
  }
  return {
    source: line,
    heading: parsed.heading,
    fullTokens: parsed.tokens,
    retainedTokens: retained,
    retainedAtomicCount,
    rangesTrimmed,
    text: retained.length ? `${parsed.heading}, ${retained.join(", ")}` : parsed.heading,
  };
}

const groups = [];
for (let index = 0; index < fullLines.length; index += 1) {
  const main = fullLines[index];
  if (main.indentation_level !== 0) throw new Error(`Orphaned subentry at full line ${index + 1}`);
  const children = [];
  while (index + 1 < fullLines.length && fullLines[index + 1].indentation_level > 0) children.push(fullLines[++index]);
  groups.push({ main: filterLine(main), children: children.map(filterLine) });
}

const retained = [];
let retainedContainers = 0;
let rangesTrimmed = 0;
for (const group of groups) {
  const children = group.children.filter((line) => line.retainedTokens.length > 0);
  const keepMain = group.main.retainedTokens.length > 0 || children.length > 0;
  if (!keepMain) continue;
  if (!group.main.retainedTokens.length && children.length) retainedContainers += 1;
  retained.push(group.main, ...children);
  rangesTrimmed += group.main.rangesTrimmed + children.reduce((sum, line) => sum + line.rangesTrimmed, 0);
}

const fullDisplayedLocators = fullLines.reduce((sum, line) => sum + parseDisplayedLine(line.displayed_line_text).tokens.length, 0);
const fullAtomicLocators = fullLines.reduce((sum, line) => sum + parseDisplayedLine(line.displayed_line_text).tokens.reduce((inner, token) => inner + token.atomicCount, 0), 0);
const scopedDisplayedLocators = retained.reduce((sum, line) => sum + line.retainedTokens.length, 0);
const scopedAtomicLocators = retained.reduce((sum, line) => sum + line.retainedAtomicCount, 0);
const counts = {
  full_displayed_lines: fullLines.length,
  scoped_displayed_lines: retained.length,
  removed_displayed_lines: fullLines.length - retained.length,
  full_displayed_locators: fullDisplayedLocators,
  scoped_displayed_locators: scopedDisplayedLocators,
  removed_displayed_locators: fullDisplayedLocators - scopedDisplayedLocators,
  full_atomic_locators: fullAtomicLocators,
  scoped_atomic_locators: scopedAtomicLocators,
  removed_atomic_locators: fullAtomicLocators - scopedAtomicLocators,
  retained_containers: retainedContainers,
  ranges_trimmed: rangesTrimmed,
};

const candidateId = `${fullLayout.candidate_id}-scope-1-${maximumPage}`;
const scopedCandidate = {
  schema_version: "indexia-scoped-candidate-v1",
  candidate_id: candidateId,
  scope: { minimum_printed_page: 1, maximum_printed_page: maximumPage },
  provenance: {
    original_candidate_file: basename(originalCandidatePath),
    original_candidate_sha256: sha256(originalCandidateBytes),
    full_layout_file: basename(fullLayoutPath),
    full_layout_sha256: sha256(fullLayoutBytes),
    transformation_id: "filter-published-view-to-printed-page-scope",
    transformation_version: "1.0.0",
  },
  transformation: {
    source_view: "fully delivered published display from the full candidate layout",
    rules: [
      `retain only displayed atomic locators in printed-page scope 1–${maximumPage}`,
      `trim a displayed range crossing ${maximumPage} to end at ${maximumPage}`,
      "prune a leaf line when no displayed locator remains",
      "prune a parent container when it has neither a retained displayed locator nor a retained descendant",
      "never restore locators suppressed in the fully delivered published view",
      "preserve surviving heading spelling, order, indentation, hierarchy, locator spelling, and punctuation",
    ],
  },
  counts,
  lines: retained.map((line) => ({
    source_line_id: line.source.line_id,
    indentation_level: line.source.indentation_level,
    displayed_line_text: line.text,
  })),
};

const scopedCandidateBytes = Buffer.from(`${JSON.stringify(scopedCandidate, null, 2)}\n`);
const scopedCandidateSha256 = sha256(scopedCandidateBytes);
const lineHeight = 20;
const pageHeight = retained.length * lineHeight + 40;
const scopedLines = retained.map((line, index) => {
  const top = 20 + index * lineHeight;
  return {
    ...line.source,
    line_id: `scoped-line-${String(index + 1).padStart(4, "0")}-${line.source.line_id}`,
    reading_order: index + 1,
    bbox: [line.source.indentation_level * 40, top, 1200, top + 16],
    heading_text: line.heading,
    displayed_line_text: line.text,
    original_displayed_form: line.text,
  };
});
const lineIds = scopedLines.map((line) => line.line_id);
const scopedLayout = structuredClone(fullLayout);
scopedLayout.candidate_id = candidateId;
scopedLayout.candidate_sha256 = scopedCandidateSha256;
scopedLayout.adapter_id = "indexia-published-view-scope-filter";
scopedLayout.adapter_version = "1.0.0";
scopedLayout.adapter = {
  requested_id: "indexia-published-view-scope-filter",
  id: "indexia-published-view-scope-filter",
  version: "1.0.0",
  selection_reason: "user_authorized_common_source_scope_1_425",
  selection_evidence: {
    original_candidate_sha256: sha256(originalCandidateBytes),
    full_layout_sha256: sha256(fullLayoutBytes),
    transformation_id: scopedCandidate.provenance.transformation_id,
    maximum_printed_page: maximumPage,
    ...counts,
  },
};
scopedLayout.pdf = { page_count: 1, producer: "scope-candidate-layout.mjs", has_embedded_text: true };
scopedLayout.pdf_metadata = {
  file_name: basename(scopedCandidatePath),
  sha256: scopedCandidateSha256,
  byte_length: scopedCandidateBytes.length,
  page_count: 1,
  is_pdf: false,
  is_encrypted: false,
  title: fullLayout.pdf_metadata.title,
  author: fullLayout.pdf_metadata.author,
  subject: `Published subject index mechanically scoped to printed pages 1–${maximumPage}`,
  keywords: null,
  creator: "scope-candidate-layout.mjs",
  producer: "scope-candidate-layout.mjs",
  format: "application/json",
  creation_date: null,
  modification_date: null,
  original_candidate_sha256: sha256(originalCandidateBytes),
  full_layout_sha256: sha256(fullLayoutBytes),
  transformation_id: scopedCandidate.provenance.transformation_id,
};
scopedLayout.pages[0].height = pageHeight;
scopedLayout.pages[0].line_ids = lineIds;
scopedLayout.pages[0].regions[0].bbox = [0, 0, 1200, pageHeight];
scopedLayout.pages[0].regions[0].line_ids = lineIds;
scopedLayout.pages[0].regions[0].line_count = scopedLines.length;
scopedLayout.pages[0].regions[0].lines = scopedLines;
scopedLayout.counts.lines = scopedLines.length;
scopedLayout.counts.index_lines = scopedLines.length;
scopedLayout.limitations = [
  "The candidate is a user-authorized mechanical derivative of the fully delivered Indexia published view, limited to printed pages 1–425 for common-source evaluation scope.",
  "The filter never consults raw stored term locators and therefore cannot restore parent locators suppressed by the published view.",
  "The derivative is JSON, so candidate_pdf_page is a one-based logical page and bounding boxes are deterministic synthetic coordinates.",
];

const textSet = new Set(scopedLines.map((line) => line.displayed_line_text));
const administration = scopedLines.find((line) => line.displayed_line_text === "administration");
const scoped1789 = scopedLines.find((line) => line.displayed_line_text.startsWith("1789, "));
if (!scoped1789?.displayed_line_text.endsWith(", 425") || scoped1789.displayed_line_text.includes("425–26")) {
  throw new Error("Crossing-range regression failed for 425–26");
}
if (textSet.has("anarchy")) throw new Error("Empty-parent pruning regression failed");
if (!administration || parseDisplayedLine(administration.displayed_line_text).tokens.length) {
  throw new Error("Suppressed-parent locator non-resurrection regression failed");
}
if (scopedLines.some((line) => parseDisplayedLine(line.displayed_line_text).tokens.some((token) => token.end > maximumPage))) {
  throw new Error("Scoped layout contains an out-of-scope locator");
}

mkdirSync(dirname(scopedCandidatePath), { recursive: true });
mkdirSync(dirname(scopedLayoutPath), { recursive: true });
writeFileSync(scopedCandidatePath, scopedCandidateBytes);
writeFileSync(scopedLayoutPath, `${JSON.stringify(scopedLayout, null, 2)}\n`);
console.log(JSON.stringify({
  original_candidate_sha256: sha256(originalCandidateBytes),
  full_layout_sha256: sha256(fullLayoutBytes),
  scoped_candidate_sha256: scopedCandidateSha256,
  scoped_layout_sha256: sha256(readFileSync(scopedLayoutPath)),
  counts,
}));
