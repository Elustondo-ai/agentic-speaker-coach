AI-MODIFIED - 2026-10-14T21:04:55Z
# Feedback and manual function contracts
Agent: ASDLC-08
Sources: source/app.js; source/index.html; source/docs/Plan.md; source/docs/HLD/04-turn-state-machine/speaker-notes.md; source/docs/HLD/06-code-structure/speaker-notes.md; context/05/02-turn-timing-and-hld-drift/speaker-notes.md
Visual: [Feedback boundaries](visual.mmd).
OBSERVED: LAND_AFTER_S=25 and STOP_AFTER_S=35 feed strict greater-than comparisons; STOP is tested first.
OBSERVED: GOOD applies through exactly 25 s, LAND IT above 25 through exactly 35 s, STOP strictly above 35 s. Reset yields zero and GOOD on that tick.
OBSERVED: setState(name) reads STATES[name] and writes panel text, background and foreground only; it changes neither mic state nor audio resources.
OBSERVED: STATES maps good to GOOD/green/white, land to LAND IT/gold/black, stop to STOP/red/white.
OBSERVED: index.html supplies panel, debug and listen IDs plus matching data-state buttons before loading app.js; these are required DOM collaborators.
OBSERVED: Manual handlers call setState(btn.dataset.state). Each listening tick overwrites feedback; no manual persistence flag exists.
OBSERVED: No invalid-name guard exists in setState; supplied buttons and automatic calls use valid keys.
DOCUMENTED: Plan specifies GOOD below 45 s, LAND IT from 45 to 75 s and STOP at or above 75 s; HLD repeats 45/75.
CONTRADICTED: Strict >25/>35 implementation differs from documented 45/75 values and inclusive Plan transitions; drift remains unresolved.
CONTRADICTED: Plan lists automatic timing as a next increment although tick already assigns feedback automatically; chronology is unavailable.
INFERRED: Automatic mapping advances during retained pauses; manual choices can move the panel backwards during an active turn.
UNVERIFIED: Visible transition latency and runtime DOM behavior were not tested.
Uncertainties: Approved timing policy, change rationale and document chronology remain unknown.
Contradictions: Timing constants, equality semantics and automatic-timing status differ as above; no replacement policy is selected.
Evidence limit: Static contracts only; no application implementation, tests or approval.
Run: 20261014T205435Z-149579087f.
