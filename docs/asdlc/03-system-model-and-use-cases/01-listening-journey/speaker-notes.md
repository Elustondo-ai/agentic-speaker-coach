AI-MODIFIED - 2026-10-14T20:57:39Z
# listening journey
Agent: ASDLC-03
Sources: source/app.js; source/index.html; source/docs/HLD/02-pipeline/speaker-notes.md; source/docs/HLD/01-purpose/speaker-notes.md
OBSERVED: Page starts GOOD with microphone off and zero duration.
INFERRED: Actors are the control operator, feedback-viewing speaker and browser permission/audio provider; operator and speaker may coincide.
DOCUMENTED: Interview feedback is intended to be glanceable.
OBSERVED: Start Listening disables its button and displays requesting permission.
OBSERVED: Microphone access and audio setup/resume success set listening status, rename the disabled button Listening and schedule 100 ms ticks.
OBSERVED: Permission or setup exceptions display error plus exception name and enable retry.
OBSERVED: No stop-listening control is supplied; STOP is a feedback label.
UNVERIFIED: Permission success, denial, setup failures and retries were not executed.
Uncertainties: Browser support, actual error names and recovery after partial setup lack runtime evidence.
Contradictions: None observed for this journey; HLD agrees with the request-to-listening path.
Evidence limit: Static source inspection only; no replacement proposal, runtime verification or approval.
Run: 20261014T205435Z-149579087f.
