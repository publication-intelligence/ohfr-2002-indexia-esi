# Indexia V8 final-report acceptance

## Acceptance verdict

**Accepted.** The corrected V10 report and canonical public projection faithfully represent the unchanged registered V8 evaluation. The final score remains **68.80% — Weak**. Acceptance of the reporting artifacts does not override the separate readiness result: the evaluated index remains **not publication ready** because the Central Omission, Stance, Clutter, and Grounding gates are triggered.

No material reporting inconsistency remains in the reviewed scope.

## Hash-bound result

This acceptance is bound to the completed atomic replacement recorded at `2026-09-16T14:15:38Z`:

- `scoring/web-report.v10.json`: `6f1299278b69f49ac26a7f49ea057b521d279ad475ff44b59f8f7b645cf119f9`
- `scoring/v8-canonical-projection/projection.v1.json`: `1f2f867d3f2ce5ad4da959d6b160d5a9cc8e7e0cee04f5ebaa4935ea73e1b983`
- `evaluation-state.json`: `fd4e56e0c6a2b3bde3d1c14845972fe21b499858cd49f90aeb19e125cc580994`

State validation passes with no errors or warnings. All 113 registered artifacts exist and match their recorded SHA-256 values. The corrected web report passes the current V10 schema, and the projection plus its three collections pass the strict current public-bundle validator.

## Unchanged evaluation and collection evidence

The reporting repair did not change scoring, substantive judgments, or collection data. These reviewed hashes remain identical to the pre-repair snapshot:

- Dimension calculations: `e3e9b2c1286f2e169078eb744e0cc036a9c4cc70e041d2ce509df5082c21e577`
- Evaluation result: `c165e2981f3cb0ab725d83d363510d94c5f8d9aef56ba17340f149422318b171`
- Item assessments: `29f3ab8c5bba23ec9f6e73540444c2f5c5b67e39c02ec5ada0e17936d4c1f67b`
- Projection metadata: `9feb4215d8b523ae95258dec34c7e30908e8b1944ad15efe03e128147bc97904`
- Structure audit: `02ae06e9aad0cf0b9f302bbedcb35bde1c78bc4d428bdd1cbbeec6bb2840e5f0`
- Index-record collection: `49803eb3966c5c60b2d145df782df48fd0b7919a18f5135694ebf3fce78aadbd`
- Source-subject collection: `7ea4859c6a814e361566c7d1f4f3bdf761586a3c578ef4a9230c2443a30f530f`
- Density collection: `2f8025996cfdf4651071f3718c5415c63144c176c615e41dc774883ed14ca2cf`

The scorecard remains the canonical six-dimension result: Coverage 40, Selectivity 61.19504877077157446436721079, Concept 80, Reliability 70, Findability 85.66238800735458226610409072, and Mechanics 99.84073928430987023200943767.

## Corrected public score semantics

Each projected dimension row now contains the authoritative exact V8 fields:

- `dimension_percentage` as the full-precision decimal string;
- `weighted_contribution` as the full-precision decimal string; and
- `weight` as the canonical dimension weight.

The established generic website adapter fields remain present for compatibility:

- `rating = dimension_percentage / 20`;
- `awarded_points = weighted_contribution`; and
- `maximum_points = weight`.

All six rows satisfy those relationships exactly under the defined numeric compatibility transform. The report disclosures and projection limitations explicitly state that the exact percentage and contribution strings are authoritative and that the numeric rating and points fields are adapter-only aliases. No canonical arithmetic consumes the aliases.

The density collection likewise preserves authoritative `fit_percentage = 4.091455335408128678396450251` alongside the required compatibility alias `fit_rating = 0.20457276677040642`; the alias reconstructs from the percentage using the same divide-by-20 transform.

## Denominator disclosure

The Meaningful Coverage denominator is now explicit in both the V10 calculation explainer and the canonical score view:

- original benchmark subjects: 1,366;
- applicable and measured subjects: 1,280;
- excluded subjects: 86;
- exclusion reason: `optional_not_frozen_as_scored`; and
- uninspectable/not measured: 0/0.

This resolves the earlier ambiguity between visible optional-subject diagnostic outcomes and aggregate Coverage applicability. Optional outcomes remain available for inspection but are machine-identifiable as excluded from the dimension denominator.

## Privacy and public safety

The corrected report and projection retain the public-safety contract. Focused scans found no absolute paths, restricted-file identifiers, storage-provider identifiers, secret-bearing fields, source-excerpt or quotation fields, or private layout-evidence fields. The projection explicitly records that source excerpts, restricted files, private layout evidence, and absolute paths are absent.

## Methods and limitations

This was a narrow post-repair acceptance review using evaluator runtime commit `765adc3e1ca7fbb03471072c1c37345f5151d5c3`. The installed 104-file skill tree exactly matched that commit. The review ran state validation, current report-schema validation, strict public-bundle validation, all registered-file hash checks, pre/post hash comparisons for scoring and collection artifacts, exact scorecard and compatibility-alias comparisons, denominator checks, and focused public-safety scans.

The review did not repeat the 425-page semantic audit, regenerate scoring, or change canonical files. It accepts the previously reviewed frozen judgments and score as its boundary. The underlying readiness gates remain deliberately separate from report acceptance.
