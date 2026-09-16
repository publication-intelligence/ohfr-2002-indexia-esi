# Indexia evaluation — targeted V8.1 migration

The revised score is **71.30/100 (Mixed)**, compared with the original V8 **68.80/100 (Weak)**. Evaluation evidence is **valid**; the index remains **not publication ready**. Three publication gates trigger: central omission, stance, and independently supported grounding. The clutter gate no longer triggers.

This evaluates the same user-authorized derivative restricted to printed pages **1–425**, not the original candidate's references through page 460. The 17 chapters, 194,718 source words, 13,143 atomic locators, 1,366 benchmark subjects, and optional-subject exclusions are unchanged.

| Dimension | Uncapped score, unchanged | V8 final | V8.1 final | Selected V8.1 ceiling |
| --- | ---: | ---: | ---: | --- |
| Meaningful Coverage | 85.782689 | 40 | 40 | Applied cap: 40 |
| Editorial Selectivity | 61.195049 | 61.195049 | 61.195049 | None |
| Conceptual/Stance Fidelity | 99.490759 | 80 | 80 | Applied cap: 80 |
| Page-reference Reliability | 85.252014 | 70 | 80 | Applied cap: 80 |
| Findability/Navigation | 85.662388 | 85.662388 | 85.662388 | **Non-binding triggered ceiling: 90** |
| Mechanics/Consistency | 99.840739 | 99.840739 | 99.840739 | None |

Full-precision values determine the total. All ordinary component numbers and all individual item assessments are unchanged. Reliability's qualifying distributed pattern falls from 1,183 to 782 locators because 401 `material_mismatch` findings do not meet the new severe-mismatch/no-fit threshold. Their ordinary deductions remain. The resulting 5.949935% rate across 15/17 source sections selects the 80 ceiling. A separate major delivered no-fit ceiling also triggers at 80. The former high-value-treatment-recall ceiling is removed; recall and F1 deductions remain.

The four critical essential omissions retain their Coverage cap and central-omission gate. The major Russia stance reversal retains its Concept cap and stance gate. Its former duplicate grounding escalation is removed. Grounding qualifies independently through seven major path-bound defects and 207 delivered major severe-mismatch/no-fit locators. These are destination failures, not an escalation for localized clutter alone. Exact IDs, severity bases, retrieval consequences, counts, rates, and thresholds are in the [migration report](migration-v8.1/REPORT.md) and [change ledger](migration-v8.1/change-ledger.json).

All 204 partial-fit findings and the missing Napoleon-to-Bonaparte reference retain yellow review signals and their ordinary deductions. Neither individually caps or gates. There are zero validity blockers, zero uninspectable locators, a complete audit attestation, and no candidate-output failure. The authorized 1–425 scope is unchanged.

The migration uses `subject-index-standard-policy-v8.1`, `subject-index-rubric-v8.1`, and `subject-index-dimension-calculation-v6` from methodology commit `25fa3983f4980ad6a168610e08b128def11258b2`. Compatible artifact schemas, filenames, and evaluation/report IDs retain their older names.

No discovery, benchmark synthesis or independent review, candidate normalization, or substantive audit was rerun. Original release evidence and approvals are preserved; no new approval is claimed. Of 113 registered artifacts, **87 remain byte-identical** and **26 change** through policy rebinding and derived calculation/report updates. All 69 structure defects and all audit judgments are unchanged. The benchmark changes only its top-level policy and self-hash; 17 missing-access files change only their benchmark hash.

The [canonical state](evaluation-state.json), [result](scoring/evaluation-result.v12.json), [web report](scoring/web-report.v10.json), and [projection](scoring/v8-canonical-projection/projection.v1.json) are current. All three public collections are byte-identical to V8, so the existing [lossless distribution gzip](distribution/README.md) remains valid.

Validation passed: 150 methodology tests, complete 17-chunk locator and missing-access batch validation, typed scoring/report generation, all original and revised input hashes, all registered artifact hashes, item-provenance and ordinary-component comparisons, report schemas, the full projection bundle, and independent weighted arithmetic. State validation has no errors or warnings. See [verification](migration-v8.1/verification.json).

Original public artifacts remain in Git at `e92e247`. The local restricted archive `migration-v8.1/private/original-v8-registered-artifacts.zip` preserves the exact original state and all 113 registered artifacts, including private calculations and evidence. Its [preservation receipt](migration-v8.1/original-v8-preservation.json) records every hash. Historical V8 validation and independent acceptance records retain their original meaning; they do not assert independent review of this migration. No website deployment or PR merge was performed.
