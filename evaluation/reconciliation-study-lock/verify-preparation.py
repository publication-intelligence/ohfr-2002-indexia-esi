"""Read-only incumbent-v3 identity comparison; does not migrate or alter registered artifacts."""
import hashlib
import json
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HERE = Path(__file__).resolve().parent

def read(p):
    return json.loads(p.read_bytes())

def sha(p):
    return hashlib.sha256(p.read_bytes()).hexdigest()

def main():
    legacy_path = ROOT / 'import/legacy-benchmark-v3/source/source-benchmark.v3.json'
    legacy = read(legacy_path)
    assert sha(legacy_path) == '34a399cda8ca9f1b07b9fa0ddad36ac4f5073ef12d8b12df42fb023818508b27'
    assert legacy['benchmark_sha256'] == 'b925797fcab50b2008ad5974590e323f772e5ea7013efa84ce7606007439aeb3'
    provenance = read(ROOT / 'validation/benchmark-compatibility-import-provenance.v1.json')
    assert provenance['legacy']['artifact_freeze_commit'] == '98dbffd0ca171b5b7db76dbe1b2b5d5265ccacab'
    for relation in legacy['relationships']:
        relation['relationship_type'] = relation.pop('type')
    current = read(ROOT / 'source/source-benchmark.v8-import.json')
    wrapper = {'benchmark_id', 'version', 'evaluation_id', 'policy_sha256', 'freeze', 'benchmark_sha256'}
    assert set(current) - set(legacy) == {'compatibility_import'}
    assert set(legacy) - set(current) == set()
    substantive = sorted(set(legacy) - wrapper)
    for key in substantive:
        assert legacy[key] == current[key], key
    state = read(ROOT / 'evaluation-state.json')
    preservation = read(ROOT / 'migration-v8.2/preservation.json')
    archive = ROOT / 'migration-v8.2' / preservation['archive_path']
    assert sha(archive) == preservation['archive_sha256']
    assert sha(ROOT / 'evaluation-state.json') == preservation['state_sha256']
    with zipfile.ZipFile(archive) as frozen:
        for artifact in state['artifacts']:
            p = ROOT / artifact['path']
            assert sha(p) == artifact['sha256']
            assert p.read_bytes() == frozen.read(artifact['path'])
    batches = {}
    for kind in ('locator_audit', 'missing_access_audit'):
        records = [a for a in state['artifacts'] if a['artifact_type'] == kind]
        assert len(records) == 17
        for a in records:
            doc = read(ROOT / a['path'])
            assert doc['candidate_sha256'] == state['candidate']['candidate_sha256']
            if kind == 'missing_access_audit':
                assert doc['benchmark_sha256'] == current['benchmark_sha256']
        batches[kind] = len(records)
    structure = read(ROOT / 'structure/structure-audit.v6.json')
    density = structure['density']['chapter_measurements']
    assert len(density) == 17
    public = read(ROOT / 'scoring/v8-canonical-projection/data/source-subjects.v1.json')
    result = {
        'ok': True,
        'status': 'preparation only; no registered artifact changed',
        'incumbent_v3_freeze': provenance['legacy']['artifact_freeze_commit'],
        'selected_study_authority': None,
        'authority_selection_status': 'pending candidate-blind source comparison',
        'legacy_file_sha256': sha(legacy_path),
        'legacy_canonical_sha256': legacy['benchmark_sha256'],
        'normalization': 'relationships[*].type -> relationship_type',
        'exactly_equal_top_level_fields': substantive,
        'different_wrapper_fields': sorted(k for k in wrapper if legacy[k] != current[k]),
        'current_added_provenance_field': 'compatibility_import',
        'benchmark_counts': public['counts'],
        'registered_artifacts_equal_to_final_handoff': len(state['artifacts']),
        'current_audit_bindings_verified': batches,
        'density_indexable_source_words': sum(x['indexable_source_words'] for x in density),
        'density_basis_by_chunk': density,
        'candidate_seen': read(ROOT / 'source/evaluation-policy.v4.json')['freeze']['candidate_seen'],
        'activation_authorized': False,
        'new_review_claimed': False,
    }
    assert result['candidate_seen'] is True
    (HERE / 'preparation-verification.json').write_text(json.dumps(result, indent=2) + '\n')
    print(json.dumps({k:v for k,v in result.items() if k != 'density_basis_by_chunk'},indent=2))

if __name__ == '__main__':
    main()
