# Indexia V10 R2 evaluation report

This migration applies the frozen V4 benchmark through the corrected V10 semantic runtime to the Indexia candidate. The evaluation workflow completed successfully and the resulting state, study preflight, web projection, and portable checkpoint all validate.

## Result

The authoritative evaluation is **indeterminate**. No overall percentage is established because editorial selectivity and findability/navigation retain semantic uncertainty after source inspection.

| Dimension | Weight | Result |
| --- | ---: | ---: |
| Meaningful coverage | 20 | 98.5067873303% |
| Editorial selectivity | 15 | unresolved (87.7786530130%–89.4801102796% substantive-selectivity envelope; density fit 4.0780248346%) |
| Conceptual stance fidelity | 15 | 100% |
| Page-reference reliability | 25 | 80% |
| Findability/navigation | 20 | unresolved |
| Mechanics/consistency | 5 | 99.9823043649% |

The method-readiness status is **not ready** because `GATE-WRONG-LOCATOR` is triggered. The structure audit records two major and 48 minor defects. The result also records unresolved locator axes and one unresolved architecture judgment, so the unresolved dimensions cannot be collapsed to a defensible single score.

## Evidence and validation

- 17 locator chunks registered with 13,143 exact-once locator judgments.
- 17 missing-access chunks registered for 531 subjects, 617 reader tasks, and 2,385 treatments.
- Candidate-access review passed as sufficient for all 2,732 frozen requirements.
- Evaluation state validation completed with no errors or warnings.
- Retrospective study preflight passed with density required.
- Public web projection `OHFR-V10-WEB-26A5C8C0634D` built successfully.
- Portable checkpoint contains 108 public artifacts and excludes 18 restricted source artifacts. A clean import validates; the expected warnings identify the excluded source PDF and its 17 restricted chunks for reconnection.

The raw canonical index-record projection exceeds GitHub's per-file limit. The tracked `.json.gz` file is a deterministic, lossless gzip of that registered JSON, following the repository's existing projection-storage convention.

## Provenance

- Tested runtime revision: `fdb4bd8c0254804d115f6072f37efc980e10e59d`
- V10 semantic compatibility SHA-256: `080329461b19df8c23d22c6b39b2e5fa8f2793fc347cd65926f2d7ef57fd39d2`
- Frozen selected benchmark SHA-256: `ecaa94ecf2ebd020825b56fc9a79d67ee767f00ee93653edcb8210ac0b7915ef`
- Evaluation result SHA-256: `cc09b1cb08712cbcd558890ac8cc177f88644b36ec85d544aa13b7828cd09e4e`
- Web report SHA-256: `5af41f33759141d14ef0be03c2c863a6372d76c633aa3e16a47dfd41fb0f5cc7`
- Portable checkpoint SHA-256: `4e00efae0f927fd9b40f0ab259ee8711ab3f1b3e51b987cad898b8fdd05e5496`
- Canonical index-record JSON SHA-256: `c32d911f9469f59d31842dff3d72175ae25b02c1a2535f44aebaadc7bb2b34b7`
- Tracked index-record gzip SHA-256: `e324824e83567f9e9fa39326ed5448e446f56589bca0948dc4b6995b780334bf`
