AI-MODIFIED - 2026-10-14T20:57:39Z
# manual controls
Agent: ASDLC-03
Sources: source/index.html; source/app.js; source/docs/Plan.md; source/docs/HLD/05-screen-mockup/speaker-notes.md; context/02/02-capability-status/speaker-notes.md
OBSERVED: Manual buttons change panel label/colors only, not turn start, lastVoice, speaking, microphone status or debug.
OBSERVED: Without an active listening interval there is no scheduled listening tick to overwrite selection.
OBSERVED: While listening every tick unconditionally sets feedback from duration, overriding manual selection.
DOCUMENTED: HLD describes this override and calls controls a diagnostic/test harness.
OBSERVED: Manual controls remain enabled while Start Listening is disabled; no manual override mode or pause control exists.
INFERRED: Selecting STOP during a young turn can return to GOOD next tick without stopping capture or resetting timing.
OBSERVED: Panel feedback is distinct from detected-turn state.
DOCUMENTED: Plan calls manual states already proven and automatic timing a next increment.
CONTRADICTED: Source already performs automatic feedback updates.
UNVERIFIED: Button interactions, scheduling latency and usability were not tested.
Uncertainties: Snapshot chronology and user understanding of temporary feedback are unknown; 100 ms is configured cadence, not measured latency.
Contradictions: Automatic-timing status differs as above; HLD manual override description agrees with source.
Evidence limit: Static source inspection only; no replacement proposal, runtime verification or approval.
Run: 20261014T205435Z-149579087f.
