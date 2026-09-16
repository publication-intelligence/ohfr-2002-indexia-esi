# Indexia evaluation — V8.2

**Checkpoint pending final methodology patch:** these results are preserved under `adeb691`. The coordinator has requested an uncertainty-scope fix; final gate publication and PR readiness are on hold.

The combined V8.2 gate-policy and native retrospective-provenance migration retains **71.30/100 (Mixed)** exactly. All six dimension scores, ordinary components, uncertainty bounds and ceilings remain unchanged from V8.1.

Four publication gates trigger: **wrong locator, central omission, stance, and residual grounding**. The new direct gate has 631 confirmed completely wrong delivered locators. Evaluation evidence is **valid**, gate assessment is **sufficient**, and the index remains **not publication ready**. The candidate has no delivered cross-references and therefore no broken-reference gate.

Binding ceilings remain Coverage 40, Concept 80 and Reliability 80. Findability's 90 ceiling is a **Non-binding triggered ceiling**. Partial-fit and missing supplemental-route deductions/review signals remain intact.

The policy now records actual retrospective visibility (`candidate_seen=true`) and separately preserves the original candidate-blind policy/freeze. No source discovery, benchmark review, candidate normalization or substantive audit was rerun, and no approval was invented.

See the [V8.2 report](migration-v8.2/REPORT.md), [exact change ledger](migration-v8.2/change-ledger.json), and [validation receipt](migration-v8.2/verification.json). All 170 methodology tests, complete audit batches, registered commands, hashes, numeric invariance and full projection checks pass.

The [canonical state](evaluation-state.json), [result](scoring/evaluation-result.v12.json), [web report](scoring/web-report.v10.json), and [projection](scoring/v8-canonical-projection/projection.v1.json) are current. The evaluated scope remains the user-authorized 1–425 derivative, with unchanged source/benchmark/density denominators. All three public collections are byte-identical to V8.1; the existing [distribution gzip](distribution/README.md) remains valid.

Original V8 and V8.1 archives and historical validation records remain preserved. The new [durable archive receipt](migration-v8.2/preservation.json) and [handoff receipt](migration-v8.2/handoff.json) identify the V8.2 private snapshot. Saved-project main stays at merged V8.1 pending approval of the V8.2 PR. Website integration is separate.
