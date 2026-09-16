# Common-source candidate preparation

The user authorized filtering the delivered Indexia view to printed pages 1–425, the shared source scope of the existing Indexer Labs and IndexPDF evaluations. All 425 source pages match the corresponding main-text pages of the full 2002 second edition after Unicode and whitespace normalization. The additional candidate range covers notes and appendices. The exact original PDF uploaded to Indexia is unavailable for hashing, so its identity is consistent with the evidence rather than independently proven byte-for-byte.

The original candidate and full extraction are preserved. The separate derivative retains delivered order, hierarchy, spelling, punctuation, and locator forms; trims the single range crossing page 425; and removes empty leaves and containers. It never restores parent locators suppressed by the published view. Conclusions from this run apply only to the derivative.

| Quantity | Full delivered view | Scoped derivative |
| --- | ---: | ---: |
| Displayed lines / paths | 2,817 | 2,544 |
| Displayed locator strings | 11,099 | 10,163 |
| Atomic page assignments | 14,293 | 13,143 |

The derivative has 1,785 main entries, 759 subentries, 2,543 unique heading nodes, and no cross-references. It retains 270 locator-free containers. One displayed range is trimmed; 273 lines, 936 displayed locator strings, and 1,150 atomic assignments are removed.

The coordinator reproduced the scope conversion byte-for-byte and independently compared every normalized heading path, displayed locator, and atomic assignment with the scoped input. All sets, ordering, spelling, page labels, and page-map assignments match. Private validation passed with `complete_exact_set`, no unresolved locators, no normalization issues, and no warnings. Registration used the dedicated candidate-preparation command and the frozen reviewed benchmark binding.

Candidate SHA-256: `9979219954bee42e4640d9e25357859f2f9f3409074fe8d43550a61fd62d018f`.
Reviewed evaluator commit: `3a7fc0e1bb3e388b489642e9750619ef78ae4d5a`.
Restricted paths and registered artifact hashes are recorded only in the canonical state.
