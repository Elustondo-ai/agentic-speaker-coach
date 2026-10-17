AI-MODIFIED - 2026-10-15T03:09:48Z

# Speaker Coach baseline documentation

The 37 numbered folders define this presentation's order, sorted by full folder name.
Each folder becomes exactly one slide with its complete original speaker notes.
There are 13 stage separators and 24 captured topics from run `20261014T205435Z-149579087f`.
Captured content remains `CAPTURED_NEEDS_HUMAN_REVIEW`; this build records no approval.

## Build
Run `build_presentation.py` with the installed Codex runtime Python and
`DYLD_FALLBACK_LIBRARY_PATH=/opt/homebrew/lib`.
The local adapter uses the canonical ASDLC presentation builder with the `intro` profile.
It stages contiguous slide numbers under ignored `build/`, preserving original folder IDs.
Mermaid renders are reused from the earlier review export only after source and image hash checks.
The same export's isolated pinned Python dependencies are reused without modification.
No existing PPTX is an input. Sources and the shared presentation framework remain unchanged.
The sequence diagram's documented semicolon encoding affects only its derived rendering.
Full notes, including source metadata and evidence references, are restored and verified exactly.

## Outputs
- `build/baseline-documentation.pptx`: 37 slides in source-folder order.
- `build/preview.pdf`: native rendering of the final deck, when generated.
- `build/coverage-manifest.json`: source hashes and ordered slide mapping.
- `build/complete-speaker-notes.md`: all original notes in slide order.

PowerPoint visuals are images; editable Mermaid/SVG sources remain in the numbered folders.
Original proportions are preserved. Dense diagrams require zoom for detailed reading.
