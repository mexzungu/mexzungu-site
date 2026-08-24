#!/usr/bin/env python3
# Run before any data.json deploy — exit 1 blocks the deploy.
# Checks: (1) every node has a non-empty macro_engine, (2) every node ID exists in engine-node-mapping.json.

import json
import sys
from pathlib import Path

DATA_JSON = Path(__file__).parent / "data.json"
MAPPING_JSON = Path("/home/mexzungu/brain/areas/mexzungu/project-ai-mgl/engine-node-mapping.json")


def main():
    if not DATA_JSON.exists():
        print(f"ERROR: {DATA_JSON} not found")
        sys.exit(1)
    if not MAPPING_JSON.exists():
        print(f"ERROR: {MAPPING_JSON} not found")
        sys.exit(1)

    with open(DATA_JSON) as f:
        data = json.load(f)
    with open(MAPPING_JSON) as f:
        mapping = json.load(f)

    nodes = data.get("nodes", [])
    total = len(nodes)
    errors = []

    missing_macro = []
    missing_from_map = []

    for node in nodes:
        node_id = node.get("id", "<no id>")
        if not node.get("macro_engine"):
            missing_macro.append(node_id)
        if node_id not in mapping:
            missing_from_map.append(node_id)

    if missing_macro:
        errors.append(f"FAIL: {len(missing_macro)} node(s) have blank macro_engine:")
        for nid in missing_macro:
            errors.append(f"  - {nid}")

    if missing_from_map:
        errors.append(f"FAIL: {len(missing_from_map)} node(s) not found in engine-node-mapping.json:")
        for nid in missing_from_map:
            errors.append(f"  - {nid}")

    if errors:
        for line in errors:
            print(line)
        sys.exit(1)

    print(f"OK: {total}/{total} nodes have macro_engine assignments")
    sys.exit(0)


if __name__ == "__main__":
    main()
