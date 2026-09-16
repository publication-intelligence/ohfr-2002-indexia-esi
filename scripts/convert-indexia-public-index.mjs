#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { basename } from "node:path";

const [input = "indexia-public-page.html", output = "candidate-layout-extraction.v1.json"] = process.argv.slice(2);
const bytes = readFileSync(input);
const html = bytes.toString("utf8");
const scripts = [...html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)];
const embedded = scripts.map((match) => match[2]).sort((a, b) => b.length - a.length)[0];

if (!embedded?.startsWith("self.__next_f.push(")) throw new Error("Indexia Next.js payload not found");

const rsc = JSON.parse(embedded.slice(embedded.indexOf("(") + 1, embedded.lastIndexOf(")")))[1];
const marker = '"initialData":';
const start = rsc.indexOf(marker) + marker.length;
let depth = 0;
let inString = false;
let escaped = false;
let end = -1;

for (let index = start; index < rsc.length; index += 1) {
  const character = rsc[index];
  if (inString) {
    if (escaped) escaped = false;
    else if (character === "\\") escaped = true;
    else if (character === '"') inString = false;
  } else if (character === '"') inString = true;
  else if (character === "{") depth += 1;
  else if (character === "}" && --depth === 0) {
    end = index + 1;
    break;
  }
}

if (start < marker.length || end < 0) throw new Error("Indexia initialData object not found");

const data = JSON.parse(rsc.slice(start, end));
const terms = data.terms;
const byId = new Map(terms.map((term) => [term.termId, term]));
const children = new Map();
const collator = new Intl.Collator("en", { numeric: true, sensitivity: "base" });
const sortTerms = (items) => items.toSorted((left, right) => collator.compare(left.standardizedTerm, right.standardizedTerm));

if (byId.size !== terms.length) throw new Error("Duplicate Indexia term IDs");

for (const term of terms) {
  if (!term.termId || !term.standardizedTerm) throw new Error("Term is missing a published ID or heading");
  if (!term.pages.every((page, index) => Number.isInteger(page) && page > 0 && (!index || page > term.pages[index - 1]))) {
    throw new Error(`Pages are not strictly increasing for ${term.termId}`);
  }
}

for (const term of terms.filter((item) => item.isSubentry)) {
  if (!byId.has(term.parentTermId)) throw new Error(`Missing parent for ${term.termId}`);
  const siblings = children.get(term.parentTermId) ?? [];
  siblings.push(term);
  children.set(term.parentTermId, siblings);
}

function abbreviatedEnd(first, last) {
  if (first >= 100 && Math.floor(first / 100) === Math.floor(last / 100)) {
    return String(last % 100).padStart(2, "0");
  }
  return String(last);
}

function compactPages(pages) {
  const result = [];
  for (let index = 0; index < pages.length; index += 1) {
    const first = pages[index];
    let last = first;
    while (index + 1 < pages.length && pages[index + 1] === last + 1) last = pages[++index];
    result.push(first === last ? String(first) : `${first}–${abbreviatedEnd(first, last)}`);
  }
  return result.join(", ");
}

const displayed = [];
for (const parent of sortTerms(terms.filter((term) => !term.isSubentry))) {
  const subentries = sortTerms(children.get(parent.termId) ?? []);
  const displayedSubentries = subentries.filter((term) => term.pages.length);
  if (!parent.pages.length && !subentries.length) continue;
  displayed.push({ term: parent, indentationLevel: 0, pages: displayedSubentries.length ? [] : parent.pages });
  for (const child of displayedSubentries) {
    displayed.push({ term: child, indentationLevel: 1, pages: child.pages });
  }
}

const lineHeight = 20;
const pageHeight = displayed.length * lineHeight + 40;
const lines = displayed.map(({ term, indentationLevel, pages }, index) => {
  const heading = term.standardizedTerm;
  const locators = compactPages(pages);
  const text = locators ? `${heading}, ${locators}` : heading;
  const top = 20 + index * lineHeight;
  return {
    line_id: `line-${String(index + 1).padStart(4, "0")}-${term.termId}`,
    region_id: "region-0001-index",
    candidate_pdf_page: 1,
    reading_order_region: 1,
    column: 0,
    reading_order: index + 1,
    bbox: [indentationLevel * 40, top, 1200, top + 16],
    indentation_level: indentationLevel,
    displayed_line_text: text,
    continuation_status: "standalone",
    inferred_boundary: indentationLevel ? "subentry" : "main_entry",
    confidence: 1,
    extraction_warnings: [],
    original_displayed_form: text,
  };
});

const sha256 = createHash("sha256").update(bytes).digest("hex");
const metadata = data.metadata;
const project = metadata.project;
const lineIds = lines.map((line) => line.line_id);
const layout = {
  schema_version: "candidate-layout-extraction-v1",
  candidate_id: `indexia-${project.project_id}`,
  candidate_sha256: sha256,
  source_sha256: null,
  adapter_id: "indexia-public-next-rsc",
  adapter_version: "1.0.0",
  adapter: {
    requested_id: "indexia-public-next-rsc",
    id: "indexia-public-next-rsc",
    version: "1.0.0",
    selection_reason: "embedded_structured_public_index",
    selection_evidence: {
      public_project_id: project.project_id,
      rendered_at: metadata.renderedAt,
      stored_term_count: terms.length,
      displayed_line_count: lines.length,
    },
  },
  pdf: { page_count: 1, producer: "Indexia public Next.js page", has_embedded_text: true },
  pdf_metadata: {
    file_name: basename(input),
    sha256,
    byte_length: bytes.length,
    page_count: 1,
    is_pdf: false,
    is_encrypted: false,
    title: project.book_title,
    author: null,
    subject: "Published subject index",
    keywords: null,
    creator: "Indexia Technologies LLC",
    producer: "Indexia public Next.js page",
    format: "text/html",
    creation_date: project.created_at,
    modification_date: project.updated_at,
  },
  pages: [
    {
      candidate_pdf_page: 1,
      width: 1200,
      height: pageHeight,
      two_column_layout: false,
      column_split_x: null,
      region_ids: ["region-0001-index"],
      line_ids: lineIds,
      regions: [
        {
          region_id: "region-0001-index",
          candidate_pdf_page: 1,
          region_order: 1,
          reading_order_region: 1,
          column: 0,
          role: "index_column",
          bbox: [0, 0, 1200, pageHeight],
          line_ids: lineIds,
          line_count: lines.length,
          column_detection_confidence: 1,
          lines,
        },
      ],
    },
  ],
  excluded_lines: [],
  counts: {
    pages: 1,
    regions: 1,
    lines: lines.length,
    index_lines: lines.length,
    excluded_lines: 0,
    excluded_repeated_headers: 0,
    excluded_repeated_footers: 0,
    excluded_page_number_footers: 0,
    lines_with_extraction_warnings: 0,
    column_continuations: 0,
    page_continuations: 0,
  },
  limitations: [
    "The public index is an HTML application, so candidate_pdf_page is a one-based logical page and bounding boxes are deterministic synthetic coordinates.",
    "The published reading view omits leaf terms and subentries with no displayed locator, while retaining empty parent headings that organize subentries.",
  ],
};

const expectedPrefix = ["3 May constitution, 166", "14 July, 187, 372", "20 June, 187"];
const emptyChildParentRegression = "1791, 32, 123, 130–31, 136–96, 198, 213, 222, 224, 227, 231, 238, 241, 253, 263, 280, 296, 300–02, 304–05, 307, 309–10, 319, 329, 372, 401, 403, 408, 411–12, 420, 429–30, 438, 446, 450, 455–57, 459";
if (terms.length !== 4552 || terms.filter((term) => term.isSubentry).length !== 1363) throw new Error("Unexpected Indexia term counts");
if (lines.length !== 2817 || expectedPrefix.some((text, index) => lines[index].displayed_line_text !== text) || !lines.some((line) => line.displayed_line_text === emptyChildParentRegression)) {
  throw new Error("Published reading-order self-check failed");
}

writeFileSync(output, `${JSON.stringify(layout, null, 2)}\n`);
console.log(JSON.stringify({ input, output, candidate_sha256: sha256, stored_terms: terms.length, displayed_lines: lines.length }));
