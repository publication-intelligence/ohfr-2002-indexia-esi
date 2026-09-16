# Indexia density denominator verification

Status: complete read-only measurement audit. No canonical state, benchmark, candidate, audit, structure, or scoring artifact was modified. No structure judgment or final density/scoring arithmetic was performed.

## Recommendation

For the Indexia run, use the 17 `page_review.indexable_source_words` values from the exact `source_subject_chunk` artifacts registered in the imported legacy state. Their total is **194,718 indexable source words**.

The recommended explicit basis label is:

`imported_legacy_v3_registered_source_subject_chunk.page_review.indexable_source_words`

Each future chapter measurement should also carry the selected source-subject-chunk relative path and its registered SHA-256. A generic label such as `frozen_source_discovery_page_review` is too ambiguous here because another evaluation of the same source froze a different 17-file discovery set.

Do not substitute the **195,346**-word denominator from the separate IndexPDF evaluation. That denominator is internally tied to IndexPDF's later, separately authored V8 source-discovery artifacts. It is not the denominator registered by the exact legacy state imported for Indexia.

## Identity and hash findings

- Exact imported legacy state file SHA-256: `bcab27262401b75c2aa6d64e6a0cc3793f8646557ada7b8859f68b292077194f`.
- Legacy artifact-freeze commit: `98dbffd0ca171b5b7db76dbe1b2b5d5265ccacab`.
- Source PDF SHA-256: `5f89aa2592218983c594278bfd86cc1e4b74be1dd6dd8aac5c2610a48fa34047`.
- Page-map file SHA-256: `dbc3ac1a4a7ea04403639dd9f41cdf79eebf1b8486d4ff65f799d05730fc8b0d`; embedded identity: `452602deebdae19f8e35c589f2ff2a7a0b9fc955d268b14f760391b0043e9653`.
- Chunk-manifest file SHA-256: `5287f421e1e7be03444c2681beb1e1d63d5d103a96ab770565e32411956ce396`; embedded identity: `5fc5450386114fdeb19838f54d3f1662c3d6dec81d4729c73f4f7ec0cb341a6f`.
- All 17 selected source-subject-chunk files in the benchmark repository are byte-for-byte matches for the artifact hashes registered in the exact imported legacy state.
- The current Indexia compatibility import binds the same source, page map, and chunk manifest and records that discovery, synthesis, and review were not rerun. The current V6 state does not duplicate the 17 legacy `source_subject_chunk` artifact entries, so the exact imported legacy state and its registered hashes are the explicit denominator authority.

## Source scope and extraction history

The approved owned-page ranges cover document pages 1–425 exactly once. Every selected chunk says its owned-page review is complete, and the sum of reviewed owned pages is 425. Context pages were used only for boundary understanding and excluded from the denominator. Running heads and folios were excluded throughout; unavailable endnotes were excluded under the frozen source scope.

The word counts are defensible as a frozen historical denominator, but they are not a uniform publisher-exact recount. Worker methods vary in tokenization, line-end hyphenation, chapter-title treatment, note-marker treatment, and map-label handling. Eight chunks (004, 005, 009, 010, 011, 012, 015, and 016) contain page-level counts that sum exactly to their recorded chapter totals. The remaining chunks record a total and method/scope narrative without a complete page-level numeric ledger.

Revision history supports freezing the selected values:

- Chapter 1's original and v2 discovery artifacts both record 19,778 words. The exact legacy state selects the v2 file, introduced by commit `f2a6f43f302d8bcce12a74f5de618186c3798118`; its semantic source-discovery revision did not change the word count.
- Chapters 2–17 were each introduced in their own source-discovery commits. No later commit changes their recorded word counts.
- A later Chapter 1/2 commit, `e5f2bc17100052a97505fbc2c95ffe67879b1ec7`, corrected edition identity metadata; it did not alter the counts.

## Denominator comparison

The IndexPDF density collection's Chapter 1 value of 19,854 is not an alternate reading of the Indexia-registered Chapter 1 artifact. It comes from a different source-subject-chunk file produced in a later V8 discovery wave. The same is true in every chapter.

| Chunk | Indexia imported words | IndexPDF words | Difference (IndexPDF − Indexia) |
| --- | ---: | ---: | ---: |
| CHUNK-001 | 19,778 | 19,854 | +76 |
| CHUNK-002 | 10,088 | 9,970 | −118 |
| CHUNK-003 | 9,090 | 9,171 | +81 |
| CHUNK-004 | 11,987 | 11,993 | +6 |
| CHUNK-005 | 10,384 | 10,328 | −56 |
| CHUNK-006 | 10,356 | 10,573 | +217 |
| CHUNK-007 | 6,561 | 6,627 | +66 |
| CHUNK-008 | 10,909 | 10,908 | −1 |
| CHUNK-009 | 10,537 | 10,469 | −68 |
| CHUNK-010 | 12,192 | 12,190 | −2 |
| CHUNK-011 | 11,621 | 11,628 | +7 |
| CHUNK-012 | 11,603 | 11,947 | +344 |
| CHUNK-013 | 9,810 | 9,816 | +6 |
| CHUNK-014 | 10,836 | 10,837 | +1 |
| CHUNK-015 | 12,739 | 12,633 | −106 |
| CHUNK-016 | 10,258 | 10,405 | +147 |
| CHUNK-017 | 15,969 | 15,997 | +28 |
| **Total** | **194,718** | **195,346** | **+628** |

This pattern is consistent with independent extraction/tokenization choices, not a single Chapter 1 transcription error. The two sets share source/page-map/chunk identities but not source-discovery artifact hashes or revision lineage.

## Independently verified Indexia density numerators

The normalized Indexia candidate file SHA-256 is `c3c43837b93a65618b90c5434fde71f2981d48934b4a96c5cd5e5774527535cb`, matching the current state binding. The candidate and the 17 registered locator audits independently reconcile as follows:

- 2,544 candidate records and 2,544 stable `PATH-*` IDs.
- 2,543 distinct complete heading-path tuples. One logical tuple is represented by two record/path IDs.
- 2,274 locator-bearing `PATH-*` IDs and 2,273 distinct locator-bearing complete heading-path tuples.
- 10,163 displayed locators expand to 13,143 atomic locator assignments.
- The 17 audit files contain exactly 13,143 judgments over 13,143 unique `LOC-*` IDs. Their union equals the candidate's locator inventory exactly; no locator is duplicated or omitted.
- Every audit's selected file hash matches the hash registered in current state.
- Every locator judgment's path ID, complete heading path, document page, and locator ID agrees with the normalized candidate.
- Every locator belongs to exactly one manifest-owned chapter. The manifest owns pages 1–425 exactly once.

For chapter density measurement, the path numerator is the number of unique stable locator-bearing `PATH-*` IDs present in that chapter's complete registered audit. The occurrence numerator is the audit's complete atomic `LOC-*` judgment count. Per-chunk logical heading-tuple counts happen to equal the stable path-ID counts in all 17 chunks, so the one global duplicate logical tuple does not alter any chapter numerator.

Do not use record count, displayed-locator count, or the sum of chapter path presences as a global distinct-path count. The 17 chapter audits contain 6,445 path/chunk presences but only 2,274 globally unique locator-bearing path IDs; cross-chapter reuse accounts for the difference.

| Chunk | Frozen words | Unique locator-bearing `PATH-*` IDs | Distinct complete heading tuples | Expanded `LOC-*` occurrences |
| --- | ---: | ---: | ---: | ---: |
| CHUNK-001 | 19,778 | 578 | 578 | 1,079 |
| CHUNK-002 | 10,088 | 390 | 390 | 579 |
| CHUNK-003 | 9,090 | 322 | 322 | 676 |
| CHUNK-004 | 11,987 | 405 | 405 | 839 |
| CHUNK-005 | 10,384 | 450 | 450 | 831 |
| CHUNK-006 | 10,356 | 424 | 424 | 820 |
| CHUNK-007 | 6,561 | 315 | 315 | 523 |
| CHUNK-008 | 10,909 | 411 | 411 | 863 |
| CHUNK-009 | 10,537 | 414 | 414 | 804 |
| CHUNK-010 | 12,192 | 399 | 399 | 957 |
| CHUNK-011 | 11,621 | 397 | 397 | 949 |
| CHUNK-012 | 11,603 | 357 | 357 | 831 |
| CHUNK-013 | 9,810 | 314 | 314 | 679 |
| CHUNK-014 | 10,836 | 276 | 276 | 563 |
| CHUNK-015 | 12,739 | 308 | 308 | 723 |
| CHUNK-016 | 10,258 | 260 | 260 | 519 |
| CHUNK-017 | 15,969 | 425 | 425 | 908 |
| **Raw totals/presences** | **194,718** | **6,445 chapter presences** | **6,445 chapter presences** | **13,143** |

Global distinct locator-bearing counts are 2,274 stable path IDs and 2,273 complete heading tuples. The chapter presence total is intentionally larger because 1,319 path IDs appear in more than one chapter; there are 4,171 repeat presences beyond the first.

## Explicit handoff for later structure work

If the later structure artifact is authored, each chapter row should use the raw values above and identify:

- `source_word_count_basis`: `imported_legacy_v3_registered_source_subject_chunk.page_review.indexable_source_words`
- `source_word_count_artifact_path`: the exact selected legacy relative path
- `source_word_count_artifact_sha256`: the exact registered artifact hash
- `locator_count_basis`: `complete_registered_locator_audit_unique_path_ids_and_atomic_locator_ids`

Those fields make the denominator lineage unambiguous without creating a second state manifest. The companion JSON is a report/data helper only and is not canonical workflow state.
