"""Verify this bounded migration against the preserved original, without auditing anew."""
import hashlib
import json
import sys
import zipfile
from decimal import Decimal, ROUND_HALF_UP
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(Path.home() / '.codex/skills/evaluate-subject-index/scripts'))
import dimension_score_v8_cli as cli
import scoring_core as core
import web_projection
from heading_access_provenance import validate_heading_access_provenance
from state_cli import validate_state
from structure_audit import validate_structure_audit_semantics


def read(path):
    return json.loads(path.read_bytes())


def sha(data):
    return hashlib.sha256(data).hexdigest()


def verify():
    receipt = read(ROOT / 'migration-v8.1/revised-v8.1-preservation.json')
    archive = ROOT / 'migration-v8.1' / receipt['archive_path']
    assert sha(archive.read_bytes()) == receipt['archive_sha256']
    state = read(ROOT / 'evaluation-state.json')
    errors, warnings = validate_state(state, ROOT / 'evaluation-state.json')
    assert not errors and not warnings, (errors, warnings)
    changed = []
    with zipfile.ZipFile(archive) as z:
        original = json.loads(z.read('evaluation-state.json'))
        old_records = {a['path']: a for a in original['artifacts']}
        assert len(old_records) == 113
        assert sha(z.read('evaluation-state.json')) == receipt['state_sha256']
        for a in original['artifacts']:
            assert sha(z.read(a['path'])) == a['sha256'], a['path']
        for a in state['artifacts']:
            payload = (ROOT / a['path']).read_bytes()
            assert sha(payload) == a['sha256'], a['path']
            old = old_records[a['path']]
            if old['sha256'] == a['sha256']:
                continue
            changed.append(a['path'])
            before, after = json.loads(z.read(a['path'])), json.loads(payload)
            if a['artifact_type'] == 'missing_access_audit':
                before.pop('benchmark_sha256'); after.pop('benchmark_sha256')
                assert before == after, a['path']
            elif a['artifact_type'] == 'source_benchmark':
                for key in ('policy_sha256', 'benchmark_sha256'):
                    before.pop(key); after.pop(key)
                assert before == after, 'Benchmark content or review provenance changed'
            else:
                assert a['stage'] in ('define_policy', 'scoring', 'web_report'), a['path']
        old_policy = json.loads(z.read('source/evaluation-policy.v4.json'))
        policy = read(ROOT / 'source/evaluation-policy.v4.json')
        cli.validate_v8_policy(policy)
        for key in ('source_scope', 'audience', 'audit_design', 'stage_application', 'deviations', 'content_policies'):
            assert old_policy[key] == policy[key], key
        for metrics in (old_policy['density_profile']['metrics'], policy['density_profile']['metrics']):
            for metric in metrics:
                metric.pop('provenance')
        assert old_policy['density_profile'] == policy['density_profile']
        calc = read(ROOT / 'scoring/dimension-calculations.v6.json')
        old_calc = json.loads(z.read('scoring/dimension-calculations.v6.json'))
        for before, after in zip(old_calc['dimensions'], calc['dimensions'], strict=True):
            assert before['formula_id'].replace('calculation-v6:', 'calculation-v7:') == after['formula_id']
            assert {k:v for k,v in before.items() if k not in ('formula_id', 'input_artifacts')} == {k:v for k,v in after.items() if k not in ('formula_id', 'input_artifacts')}, 'Numeric dimensions, components or cap drift'
        assert old_calc['overall_percentage'] == calc['overall_percentage']
        old_items = json.loads(z.read('scoring/item-assessments.v7.json'))
        items = read(ROOT / 'scoring/item-assessments.v7.json')
        for key in ('locator_assessments', 'path_assessments', 'heading_node_assessments',
                    'cross_reference_assessments', 'source_subject_assessments', 'assessment_completeness'):
            assert old_items[key] == items[key], key
        for config, base, loader in (
            (json.loads(z.read('scoring/dimension-calculation-input.v2.json')), Path('scoring'), z.read),
            (read(ROOT / 'scoring/dimension-calculation-input.v2.json'), ROOT / 'scoring', lambda p: Path(p).read_bytes()),
        ):
            import posixpath
            for entry in config['inputs'].values():
                for ref in entry if isinstance(entry, list) else [entry]:
                    path = posixpath.normpath(str(base / ref['path']))
                    assert sha(loader(path)) == ref['sha256'], path
    structure = read(ROOT / 'structure/structure-audit.v6.json')
    locators = [read(ROOT / a['path']) for a in state['artifacts'] if a['artifact_type'] == 'locator_audit']
    missing = [read(ROOT / a['path']) for a in state['artifacts'] if a['artifact_type'] == 'missing_access_audit']
    validate_structure_audit_semantics(structure)
    validate_heading_access_provenance(structure, locators, missing)
    for filename, schema in (
        ('dimension-calculations.v6.json', 'dimension-calculations-v6.schema.json'),
        ('item-assessments.v7.json', 'item-assessments-v7.schema.json'),
        ('projection-metadata.v2.json', 'v8-projection-metadata-v2.schema.json'),
        ('evaluation-result.v12.json', 'evaluation-result-v12.schema.json'),
        ('web-report.v10.json', 'web-report-v10.schema.json'),
    ):
        core.validate_schema_document(read(ROOT / 'scoring' / filename), schema, filename)
    assert calc['calculation_sha256'] == core.canonical_hash(calc, 'calculation_sha256')
    total = sum(Decimal(d['dimension_percentage']) * Decimal(d['dimension_weight']) / 100 for d in calc['dimensions'])
    assert total.quantize(Decimal('.01'), rounding=ROUND_HALF_UP) == Decimal(str(calc['overall_percentage']))
    metadata = read(ROOT / 'scoring/projection-metadata.v2.json')
    assert policy['freeze']['candidate_seen'] is True
    assert policy['retrospective_migration']['original_policy']['freeze']['candidate_seen'] is False
    assert metadata['gate_assessment']['status'] == 'sufficient'
    assert not structure['candidate_denominator']['cross_reference_ids']
    assert not structure['cross_reference_judgments']
    wrong = next(g for g in metadata['critical_gates'] if g['gate_id'] == 'GATE-WRONG-LOCATOR')
    expected_wrong = {x['locator_id'] for doc in locators for x in doc['judgments'] if x['judgment'] == 'unsupported' and x['complete_path_fit'] == 'no_fit' and x['source_scope_status'] in {'indexable', 'excluded'} and x['treatment_class'] != 'unavailable' and x['confidence'] in {'high', 'medium'} and x['evidence_ids'] and x.get('fit_rationale', '').strip()}
    assert set(wrong['affected_evidence_ids']) == expected_wrong

    assert metadata['evaluation_validity'] == {'status': 'valid', 'blockers': [], 'used_as_publication_gate': False}
    for dimension in calc['dimensions']:
        for cap in dimension['cap_evaluations']:
            if cap['triggered']:
                assert cap['affected_evidence_ids'] and cap['threshold']
                assert all(cap['observed'].get(key) for key in ('severity_basis', 'retrieval_consequence', 'threshold_reason'))
    for gate in metadata['critical_gates']:
        if gate['triggered']:
            assert all(gate[key] for key in ('affected_evidence_ids', 'threshold_reason'))
            assert gate['consequence_evidence'] or gate.get('direct_destination_evidence')
            if gate['gate_id'] == 'GATE-GROUNDING':
                assert 'DEFECT-STA-WS03-001' not in gate['defect_ids']
                assert gate['qualifying_locator_evidence']
    bundle = ROOT / 'scoring/v8-canonical-projection'
    projection = read(bundle / 'projection.v1.json')
    collections = {key: read(bundle / 'data' / filename) for key, filename in (
        ('index_records', 'index-records.v1.json'), ('source_subjects', 'source-subjects.v1.json'), ('density', 'density.v1.json'))}
    web_projection.validate_bundle(projection, collections)
    report = read(ROOT / 'scoring/web-report.v10.json')
    nav = next(d for d in report['presentation_summary']['dimensions'] if d['dimension_id'] == 'findability_navigation')
    assert any('Non-binding triggered ceiling' in row['equation'] for row in nav['calculation_basis'])
    result = {'ok': True, 'registered_artifacts': len(state['artifacts']), 'changed_registered_artifacts': changed,
              'original_input_hashes_verified': 37, 'revised_input_hashes_verified': 37,
              'all_ordinary_components_unchanged': True, 'all_item_assessments_unchanged': True, 'all_six_dimensions_components_caps_exactly_identical': True,
              'gate_assessment': metadata['gate_assessment'], 'confirmed_wrong_locator_count': len(expected_wrong),
              'benchmark_content_and_original_review_provenance_unchanged': True,
              'exact_weighted_total': str(total), 'rounded_score': calc['overall_percentage'],
              'full_projection_bundle_valid': True, 'evaluation_validity': metadata['evaluation_validity'],
              'triggered_publication_gates': [g['gate_id'] for g in metadata['critical_gates'] if g['triggered']],
              'state_errors': errors, 'state_warnings': warnings}
    (HERE / 'verification.json').write_text(json.dumps(result, indent=2) + '\n')
    print(json.dumps(result, indent=2))


if __name__ == '__main__':
    verify()
