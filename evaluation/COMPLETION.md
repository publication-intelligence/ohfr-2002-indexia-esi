# Indexia evaluation — completion handoff

The completed V8 evaluation scores **68.80/100 (Weak)**. Its publication-readiness status is **not publication ready**. This result evaluates the user-authorized derivative restricted to printed pages 1–425 of William Doyle’s *The Oxford History of the French Revolution* (2002), not the original index’s references through page 460.

| Dimension | Weight | Final score | Principal effect |
| --- | ---: | ---: | --- |
| Meaningful Coverage | 20% | 40.00 | Four critical central omissions cap the 85.78 base at 40. |
| Editorial Selectivity | 15% | 61.20 | Substantive selectivity is 89.75%; chapter density fit is 4.09%. |
| Conceptual/Stance Fidelity | 15% | 80.00 | A major misleading Russia heading caps the 99.49 base at 80. |
| Page-reference Reliability | 25% | 70.00 | Distributed unsupported references cap the 85.25 reliability F1 at 70. |
| Findability/Navigation | 20% | 85.66 | Architecture and an undelivered warranted reference reduce access. The 90-point cap does not further reduce this base. |
| Mechanics/Consistency | 5% | 99.84 | Mostly consistent mechanics, with localized filing and wording defects. |

The weighted result uses full-precision dimension values and rounds only the final total. Displayed rounded dimension scores must not be used to reproduce the authoritative calculation. Item grades are diagnostic and do not replace dimension formulas.

## Findings and priorities

The index provides complete access to 1,074 of 1,366 benchmark subjects, partial access to 173, and no access to 119. Across 1,026 reader tasks, 791 succeed, 134 partly succeed, and 101 fail. These raw counts include optional subjects; all 86 optional subjects remain outside aggregate scoring under the frozen policy.

Of 13,143 atomic locator assignments, 10,998 are supported, 204 partly supported, and 1,941 unsupported. Binary keep precision is 83.68%; benchmark treatment recall is 86.88% (2,789 of 3,210 treatments). Partial locator support can receive diagnostic credit while still receiving zero binary keep credit.

The four central omissions concern specifically revolutionary transformations, coercion and legitimacy of national representation, expansion of emergency government, and the Great Nation’s combination of liberation ideology and coercive hegemony. The misleading Russia heading is a major stance defect; it was not classified as a critical reversal because the frozen benchmark did not establish that level of centrality.

The structure review found 56 confirmed architecture defects among 416 reviewed triggers. Broad year and subject routes sometimes need subdivisions to separate supported treatments. Long continuous ranges that represent coherent sustained treatments were accepted. Incorrectly assigned references under otherwise specific headings were treated separately from architecture. The absence of a warranted Napoleon-to-Bonaparte reference also impedes access.

The readiness gates triggered are central omission, stance, clutter, and grounding. They are separate from score arithmetic. In particular, the major stance defect triggers readiness concerns even though it does not qualify for the critical score cap. The distributed-unsupported score cap and the separately classified systemic-unsupported gate are distinct rules; the latter is not triggered in this result.

Revision priorities are to restore the missing central access, correct the misleading stance heading and unsupported references, then subdivide broad routes and address the warranted reference and localized filing defects.

## Scope, denominators, and limitations

- All 425 pages and 17 approved chapters were covered. The 17 locator audits and 17 missing-access audits are complete, with no uninspectable or unmeasured audit judgments.
- The candidate has 2,544 delivered records, 2,543 distinct complete heading tuples, 2,543 unique heading nodes, 2,274 locator-bearing record-specific paths, and 10,163 displayed locators expanding to 13,143 atomic locators. These are different units, not conflicting counts.
- All 2,543 nodes and all 416 triggered paths received structure review. There are 112 exception rows and 2,431 attested node passes. The 69 structured defect records can group multiple affected items.
- Path-level composite grades are intentionally unmeasured in the item output; all individual locator and heading-node assessments are graded. This does not indicate an unfinished audit.
- Density uses the exact imported release’s **194,718 source words** and chapter-specific counts. The 6,445 chapter path presences are not 6,445 globally distinct paths. The separately authored 195,346-word discovery release was investigated and was not substituted. See the [density verification](validation/density-denominator-verification.md).
- The source benchmark was reused through an independently reviewed V8 compatibility import; discovery and benchmark synthesis were not rerun. Retained candidate spelling and hierarchy were not repaired.
- The supplied source matches the corresponding pages of the 2002 second edition. The exact file uploaded to the producer was unavailable for byte-for-byte identity verification.

## Deliverables and verification

The [canonical state](evaluation-state.json) records all 16 workflow stages as completed. The [authoritative result](scoring/evaluation-result.v12.json), [web report](scoring/web-report.v10.json), and [canonical projection](scoring/v8-canonical-projection/projection.v1.json) are generated from the registered final artifacts. The projection contains exactly three collections: 2,544 index records in delivered order, 1,366 source subjects, and 17 density sections. No correction overlay applies. The largest collection is distributed in Git as a lossless gzip; [extraction instructions](distribution/README.md) restore its exact registered bytes.

Typed registration, scoring, report generation, and final state validation passed without warnings. [Coordinator checks](validation/final-validation.md) independently reconstruct the weighted total, verify every registered file hash, validate the report/result/calculation schemas and projection bundle, and reconcile collection and density counts. The [independent final report review](validation/final-report-acceptance.md) accepts the corrected artifacts with no material findings. The actual generic website parsers and adapter score cross-checks also pass. Detailed audit receipts are available for [missing access](validation/missing-access-completion.md) and [structure](validation/structure-completion.md).

Scoring used the reviewed evaluator commit `3a7fc0e1bb3e388b489642e9750619ef78ae4d5a`. Final reporting uses `765adc3e1ca7fbb03471072c1c37345f5151d5c3`; all 104 installed skill files match that reviewed version. Its 131 evaluator tests and 20 utility tests pass, with independent focused review. [Evaluator PR #45](https://github.com/publication-intelligence/evaluate-subject-index/pull/45) preserves delivered heading boundaries; [reporting PR #46](https://github.com/publication-intelligence/evaluate-subject-index/pull/46), stacked on #45, preserves exact percentage scores, exposes denominator exclusions, and retains the established generic website adapter aliases as explicitly nonauthoritative compatibility fields. Neither correction changes the final audit judgments or scoring arithmetic.

Source PDFs, source extracts, private audit prose, authored decision maps, structure components, serializers, and private calculation artifacts remain excluded from Git. Public reports retain synthesized explanations and evidence identifiers. The complete working evidence remains local alongside the canonical state.

## Repository and follow-up

The evaluation is delivered on `codex/indexia-full-v8-evaluation` through [evaluation PR #1](https://github.com/publication-intelligence/ohfr-2002-indexia-esi/pull/1). Website integration is a separate follow-up. No PR has been merged, and no website deployment was performed.


The local portable recovery checkpoint is `evaluation/checkpoints/indexia-v8-complete.zip`. It contains the canonical uncompressed registered artifacts; restricted source inputs remain local outside the portable archive.

All **52 delegated chats** are archived after their useful outputs were committed or preserved locally and independently reviewed. The [canonical state’s coordination records](evaluation-state.json) list each title, thread ID, responsibility, persisted output, and archive reason. The final two were the independent report analysis and the focused percentage/denominator reporting correction. Archiving updates coordination metadata after the acceptance snapshot; the reviewed artifact hashes remain unchanged.

Earlier continuation milestones are `9d1aa40` (bounded resume and review) and `39dd660` (completed missing-access review and frozen density verification). Reporting fixes are `d9f3ff1` plus the required compatibility follow-up `765adc3`; the latter is the installed final runtime.
