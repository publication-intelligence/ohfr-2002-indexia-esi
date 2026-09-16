# Canonical public projection

`../scoring/v8-canonical-projection/projection.v1.json` binds three validated collections: index records, source subjects, and density. No correction overlay applies.

The complete index-record JSON exceeds GitHub’s 100 MB per-file limit. Git contains a deterministic, lossless gzip copy. From the repository root, restore the canonical file before using this bundle:

```sh
gzip -dc evaluation/distribution/index-records.v1.json.gz > evaluation/scoring/v8-canonical-projection/data/index-records.v1.json
```

The restored file’s SHA-256 must be:

```text
49803eb3966c5c60b2d145df782df48fd0b7919a18f5135694ebf3fce78aadbd
```

The canonical state and projection retain the uncompressed path and hash. Compression does not change the artifact, its item order, scores, or bindings. The original validated JSON remains available locally and is included in the local completion checkpoint. The gzip file is a distribution copy, not a replacement scoring input or a fourth collection.

The result contains 2,544 delivered index records, 1,366 source subjects, and 17 density sections. Aggregate scores come from the authoritative dimension calculation; individual item grades must not be averaged to reconstruct them. Source excerpts and private layout evidence are excluded.

Distribution files live outside the managed projection directory so future typed report replacements can validate its exact file set without moving packaging files.
