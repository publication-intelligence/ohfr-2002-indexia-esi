# Parser fix review

Commit `7fa82ed5dc93f5edc667e9c1994e058d79ee16b9`, PR [#45](https://github.com/publication-intelligence/evaluate-subject-index/pull/45). The mapped-locator pass defers a cross-reference-only tail, allowing the complete heading Holy See to precede its numeric locators. Ordinary See and See also references remain supported.

Coordinator independently inspected the two-file diff and verified the exact reproduction plus comma/whitespace/reference variants. All 6 candidate-preparation tests and 127 evaluator tests passed. Installed skill matches all 104 files at the reviewed commit; only parser and its test changed. The previous runtime is backed up. The PR is not merged.
