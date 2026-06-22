# Handoff Notes — P4-T01

* **Downstream Alignment:** Pass output files immediately to `P4-T02: Low-poly asset check`.
* **Guardrail Enforcement:** The upcoming mesh optimization and modeling pass in `P4-T02` must strictly use these exact structural limits inside Blender. Vertices, object counts, and material nodes must validate cleanly against these budgeted slots before exporting GLTF vectors.
