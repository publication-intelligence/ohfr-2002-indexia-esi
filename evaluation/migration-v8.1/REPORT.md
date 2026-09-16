# Targeted V8 → V8.1 migration

**68.80 → 71.30. Valid evaluation; not publication ready.** This is an explicitly authorized consequence-policy migration of the exact finished Indexia evaluation at `e92e247`, not a new evaluation. The full [change ledger](change-ledger.json) lists before/after artifact hashes and every affected stable ID.

## Consequences

The selected binding ceilings are Coverage **40**, Concept **80**, and Reliability **80**. Findability **90** is a **Non-binding triggered ceiling**; its score remains 85.66238800735458226610409072. Coverage's additional 90 ceiling is non-binding against its 85.782689 base. Concept's additional 90 ceiling is superseded by 80. Reliability has two qualifying 80 ceilings; the selected distributed-pattern ceiling and explicit major delivered severe/no-fit ceiling agree. Selectivity and Mechanics have no triggered ceiling.

The distributed Reliability count is **782/13,143 = 5.9499353268%**, spanning **15/17 = 88.2352941176%** of source sections. This meets the minimum three qualifying unsupported severe/no-fit locators, 1% population and 25% source-spread entry requirements, and the 3%–below-7.5% band gives 80. The original count was 1,183 and its ceiling was 70. The excluded 401 locators all have `material_mismatch`, not `material_partial_fit`: 391 major and 10 minor. Their keep credit, diagnostic grades, and deductions are unchanged. The removed pooled high-value-treatment-recall ceiling previously triggered at 80; its component is now `reported_diagnostic_only`, with unchanged numbers.

Three publication gates trigger:

| Gate | Frozen evidence and qualifying consequence |
| --- | --- |
| Central omission | Four critical essential subjects: `SUBJ-2B5A894F09C5`, `SUBJ-30DAA1787938`, `SUBJ-77B87F55CDDF`, `SUBJ-BE2B454984A0`. `broken_scope` and `blocks`, with `high_priority_access_destroyed=true`; no accepted direct or cross-reference route. These are indispensable synthesis/concept needs, not merely supplemental omissions. |
| Stance | `DEFECT-STA-WS03-001`, `NODE-21E1763C8A0D`, complete path `PATH-57AD2D32A667`: the delivered Russia heading presents a revolutionary stance that the frozen destination evidence does not support. Major, `materially_misleading`, `misleads`. It is not reclassified as critical. |
| Grounding | Seven independently qualifying major PATH-bound defects listed below; **207 distinct delivered locators** have severe mismatch/no fit and major severity. The exact locator records and consequences appear in `publication_gates_after` in the ledger. Russia's stance defect is excluded from this gate. |

The seven grounding and localized-major navigation triggers are:

| Defect | Qualifying severe/no-fit locators | Frozen consequence |
| --- | ---: | --- |
| `DEFECT-STRUCT02-274BA9C5A25E` | 5 | Major, blocked retrieval, blocks |
| `DEFECT-STRUCT02-272E010F82D2` | 22 | Major, blocked retrieval, blocks |
| `DEFECT-STRUCT02-EF4AD23BA9C9` | 10 | Major, blocked retrieval, blocks |
| `DEFECT-SUB-WS03-001` | 18 | Major, blocked retrieval, blocks |
| `DEFECT-SUB-WS03-002` | 48 | Major, blocked retrieval, blocks |
| `DEFECT-04-ARCH-MASS` | 10 | Major, materially misleading, misleads |
| `DEFECT-04-ARCH-NATIONAL` | 94 | Major, materially misleading, misleads |

The two SUB records also describe clutter, but their qualification here depends on the separately frozen major destination failures. Clutter counts, long locator lists, or missing subdivisions alone do not qualify. The source-linked locator rationales establish absent/wrong subject treatment, including year routes to unrelated dates, a province misread as the Dauphin, ordinary causal language misread as Reason, and a crowd misread as religious Mass. No locator severity or fit was promoted for this migration.

Three former Findability ceiling triggers are excluded: `DEFECT-HED-WS03-001` has only NODE attachments; `DEFECT-04-ARCH-COMMITTEE` and `DEFECT-04-ARCH-FRANCE` lack the requisite delivered severe/no-fit evidence under the current rule. Their ordinary architecture deductions remain.

Clutter no longer gates. The largest same-root/family group has **24/2,543 = 0.9437672041%** affected paths, below 5%. Every other group is smaller. Separate root causes and NODE/PATH denominators are not pooled. The ledger records all 13 groups, deduplicated IDs, counts, source and structural spread, and rejection reasons. Thus no systemic clutter or access ceiling qualifies.

All 204 `material_partial_fit` records remain yellow and retain their diagnostic and ordinary keep-credit consequences. The missing warranted Napoleon-to-Bonaparte route (`SUBJ-C89C8EB55F55`) remains a yellow scored omission, not a gate. The audit remains valid: no excessive uninspectability, no wrong evaluated source span, no incomplete attestation. A meaningful candidate attempt is preserved separately from validity.

## Evidence and metadata preservation

All 113 original registered hashes and all 37 original calculation-input references were verified before mutation and archived. Of 113 final records, 87 are byte-identical. The 26 changed artifacts are exactly:

- `source/evaluation-policy.v4.json` — new policy identity, standard consequence rules, profile labels and freeze timestamp; unchanged source scope, audience, full audit mode and numeric density settings.
- `source/source-benchmark.v8-import.json` — only top-level `policy_sha256` and `benchmark_sha256` bytes.
- The 17 `missing-access-audit.CHUNK-001.v1.json` through `CHUNK-017` files — only `benchmark_sha256` bytes. Ownership, judgments, tasks, treatments and evidence are unchanged.
- All five `scoring/` calculation/result artifacts: calculation input, dimension calculations, item assessments, projection metadata, evaluation result. Item assessment bodies are unchanged; only derived identity/provenance metadata changes where required.
- `scoring/web-report.v10.json` and `scoring/v8-canonical-projection/projection.v1.json` — derived V8.1 results, gate evidence, validity, review signals and bindings.

The canonical state and policy-build input also change. The three generated public collections are byte-identical, including the existing distribution gzip. Original review approvals, legacy release, compatibility import evidence, source map/chunks, candidate, inventory, locator packets, all 17 locator audits, and the entire structure ledger remain unchanged. Density stays bound to the original 194,718-word release.

This migration saw the candidate. It makes **no new candidate-blind review claim**. Historical benchmark freeze/compatibility metadata stays historical. The standard policy builder's schema-fixed `freeze.candidate_seen=false` describes its candidate-independent policy configuration; it is not a new reviewer attestation. The current consequence policy was applied after the evaluation under explicit migration authorization. This ledger, not the old compatibility approval, documents the new binding.

The original V8 policy/calculation/report meaning is preserved at `e92e247` and in the local restricted archive identified by [original-v8-preservation.json](original-v8-preservation.json). No approval was invented. The evaluation/report IDs and compatible filenames still contain `v8`; authoritative method identities are the new policy, rubric and calculation profile.

## Validation and delivery

The installed methodology matches merged commit `25fa3983f4980ad6a168610e08b128def11258b2`. All **150 tests passed**, including the 19 consequence regressions. The first system-Python suite run lacked `pypdf`; rerunning with the existing complete evaluator environment passed. This was an environment issue, not a waived test.

Both complete 17-chunk audit batches pass current semantic validation. Typed `score` and `build-report` completed the derived stages. [Independent verification](verification.json) checks all registered and calculation-input hashes, unchanged audit/item bodies and ordinary numbers, structure causality, schema/self-hash validity, weighted arithmetic, all three projection collections, and the non-binding Findability label. State validation reports no errors or warnings. The [verification script](verify-migration.py) can be rerun locally with the preserved private evidence available.

No website deployment or PR merge is part of this delivery. Historical independent acceptance applies only to V8; this migration has the validations stated above, not a new independent editorial acceptance.

The final local restricted snapshot is `private/revised-v8.1-registered-artifacts.zip`; [its receipt](revised-v8.1-preservation.json) binds the completed state and archive. Both archives include restricted source/evidence and remain excluded from Git.
