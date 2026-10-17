AI-MODIFIED - 2026-10-14T21:00:05Z
# What pause, detection and timing boundaries exist?
Agent: ASDLC-04
Sources: source/app.js; source/docs/Plan.md; source/docs/HLD/03-speech-detection/speaker-notes.md; source/docs/HLD/04-turn-state-machine/speaker-notes.md; context/03/02-turn-model/speaker-notes.md; context/02/03-unresolved-timing-policy/speaker-notes.md
Visual: [Existing boundary logic](visual.mmd).
OBSERVED: RMS strictly greater than 0.02 refreshes lastVoice and starts an absent turn; equality does not qualify. Speaking requires age since lastVoice strictly less than 300 ms.
OBSERVED: Reset requires age greater than 2500 ms, evaluated on ticks; exactly 2500 ms does not reset. Retained pauses count toward elapsed duration.
OBSERVED: Qualifying sound refreshes lastVoice before reset checking; returning sound can preserve an old turn if no intervening tick reset it.
OBSERVED: GOOD applies through exactly 25 s; LAND IT above 25 through exactly 35 s; STOP above 35 s. These are source comparisons, not witnessed transitions.
OBSERVED: setInterval requests 100 ms ticks; duration display rounds to one decimal. Actual cadence and transition visibility are unmeasured.
DOCUMENTED: Plan specifies GOOD below 45 s, LAND IT from 45 to 75 s and STOP at or above 75 s; HLD describes 45/75 values and reset after 2.5 s silence.
CONTRADICTED: Source uses strict greater-than 25/35 s versus documented 45/75 and Plan's inclusive transitions. HLD silence shorthand omits strict comparison and tick evaluation.
DOCUMENTED: Plan asks for natural-pause validation and observation of false resets/false speech; no resulting measurements are supplied.
INFERRED: Other voices/noise can start or prolong turns, soft speech may be missed and long pauses may split answers; frequency and impact are unknown.
UNVERIFIED: False detections, missed detections, false resets, startup speaking indication and scheduling effects lack traces with known inputs.
Baseline questions: What recordings distinguish intended speaker, other speakers, quiet speech and noise? What observations pair known pause lengths with retention/reset?
Baseline questions: What evidence captures equality and neighboring values at RMS 0.02, hold 300 ms, silence 2500 ms and feedback 25/35 s? What trace shows sound returning around a reset tick?
Baseline questions: Which existing decision explains 45/75 versus 25/35 and inclusive versus strict boundaries? Do records distinguish rounded display from internal elapsed time?
Uncertainties: Intended timing policy, calibration provenance, natural-pause meaning and scheduling remain unknown; no new thresholds or acceptance criteria are selected.
Contradictions: Timing values and boundary descriptions conflict as above; context records the same unresolved drift, not resolution.
Evidence limit: Static reconstruction and questions only; no application tests or acceptance decisions.
Run: 20261014T205435Z-149579087f.
