AI-MODIFIED - 2026-10-14T23:13:00Z

# Speaker Coach captured baseline — human review export

Source project: `agentic-speaker-coach`; exact run: `20261014T205435Z-149579087f`.
Status: `CAPTURED_NEEDS_HUMAN_REVIEW`. This export records no approval or new analysis.
The immutable baseline topic pairs and receipt in `docs/asdlc/` remain authoritative.
The deck contains all 24 topics / 48 artifacts, grouped in lifecycle order (governance first).
Within each stage, original topic order and identifiers are preserved.
Added title/stage navigation is explicitly labelled; captured content is distinguished from export framing.
Every diagram slide contains its complete original notes, including metadata, in PowerPoint's notes pane.
Companion slides display every original notes line across readable pages without summarization.
Governance topic 02 describes its earlier execution snapshot; the title reports the final receipt separately.

## Local adapter and shared builder
Canonical [presentation skill](../../../../agentic-sdlc-governance/asdlc/skills/asdlc-presentation/SKILL.md)
and [documentation skill](../../../../agentic-sdlc-governance/asdlc/skills/asdlc-documentation/SKILL.md) control this export.
The deck-local adapter reads the canonical sources, stages SVG-compatible visuals under ignored `build/`,
and invokes the unchanged shared presentation builder with the explicit `intro` profile.
Local Mermaid renders the existing source; PNG-backed SVGs preserve browser-rendered diagram content.
No diagram is redrawn by a model. PowerPoint visuals are raster images, not editable diagram shapes.
Mermaid 11.17 rejects literal semicolons in sequence-message labels in `08/03-listening-lifecycle`.
A derived copy encodes six semicolons as Mermaid entities; all five affected labels match the original text exactly.
The original parse error, exact transformations and hashes are recorded in `build/mermaid-render-manifest.json`.
The adapter restores exact source notes after the shared builder's narration/metadata parsing.
All generated decks, previews, manifests, dependencies and staging files remain in `build/`.
No baseline, receipt, legacy file, application source, shared builder or sprint state is edited.

## Build and verification
With installed runtime Python and `DYLD_FALLBACK_LIBRARY_PATH=/opt/homebrew/lib`, run `export_review.py --prepare`.
Then use installed runtime Node for `render_mermaid.mjs`; finally run `export_review.py` with the same Python environment.
Pinned Python dependencies from the canonical skill's requirements are isolated in `build/python-deps/`.
The build verifies receipt hashes, 24 topic pairs, complete notes round-trip, companion text coverage,
diagram proportions and unchanged original source hashes; inspect rendered slide previews separately.
The final coverage manifest maps stage/topic identifiers and source hashes to slide numbers.
Reference paths in captured notes retain their historical snapshot meaning; they are not rewritten as live links.

## Review delivery
Final deck: 155 slides — 9 added navigation, 24 complete visuals, 67 magnified views and 55 complete-notes pages.
[PowerPoint](build/baseline-review-20261014T205435Z-149579087f.pptx) · [PDF preview](build/baseline-review-20261014T205435Z-149579087f.pdf)
[Browsable preview](build/preview.html) · [Complete notes](build/complete-captured-notes.md) · [Coverage](build/coverage-manifest.json)
Native LibreOffice reopens the PPTX and exports the PDF; the notes are independently reopened and compared with all originals.
See `build/verification.json`, `build/geometry-audit.json` and `build/preservation-verification.json` for actual checks.
The shared framework, all 48 baseline artifacts, receipt, prior logs, legacy source and sprint state remain unchanged.
Human review is pending; no capture, commit, push, publication or approval change was performed.
