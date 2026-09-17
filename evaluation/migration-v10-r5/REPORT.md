# Indexia V10 decision-v3 evaluation

- Authoritative overall score: **64.33%**
- Evaluator runtime: Evaluate Subject Index PR 71, tested revision `47669b44529f61414edf68ef73de676b8886958d`, payload `dce71d46d425a5862e3a2811bfbd287c4c40fa3768bb40583c35e642c95b0856`
- Evaluation validity: **valid**
- Evidence sufficiency: **sufficient** (13,143 locator assignments; 2,732 access requirements)
- Method readiness: **not ready**

## Dimension scores

| Dimension | Score | Weight | Contribution |
|---|---:|---:|---:|
| Meaningful coverage | 40.00% | 20% | 8.00 |
| Editorial selectivity | 60.90% | 15% | 9.14 |
| Conceptual and stance fidelity | 80.00% | 15% | 12.00 |
| Page-reference reliability | 50.00% | 25% | 12.50 |
| Findability and navigation | 88.47% | 20% | 17.69 |
| Mechanics and consistency | 99.98% | 5% | 5.00 |

Editorial selectivity combines 89.32% substantive selectivity with 4.08% density fit. Locator keep precision is 84.14%; treatment recall is 99.08%.

## Triggered publication gates

- `GATE-WRONG-LOCATOR`: 701 confirmed delivered unsupported/no-fit locators.
- `GATE-CENTRAL-OMISSION`: 3 critical central omissions.
- `GATE-STANCE`: 3 material stance defects affecting 14 evidence items.
- `GATE-GROUNDING`: 2 grounding defects affecting 8 evidence items.

Other standard gates did not trigger. The candidate contains zero delivered cross-references; one warranted global-structure reference obligation remains undelivered and is scored without independently triggering the cross-reference publication gate.

## Defects

The final structure ledger records 3 critical, 25 major, and 59 minor defects. The result supersedes the earlier 88.52% run, which did not carry forward all material defects, first-lookup failures, zero-reference treatment, and gate consequences under the corrected V10 contract.

## Validation

- Canonical state validation: passed with no errors or warnings.
- Calculation sufficiency preflight: sufficient; evaluation outcome valid; no unresolved locator semantics.
- Web report and canonical projection: built successfully.
