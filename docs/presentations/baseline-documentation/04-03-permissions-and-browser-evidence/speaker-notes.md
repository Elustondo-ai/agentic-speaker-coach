AI-MODIFIED - 2026-10-14T21:00:05Z
# What permission and browser evidence is missing?
Agent: ASDLC-04
Sources: source/app.js; source/index.html; source/docs/HLD/02-pipeline/speaker-notes.md; source/docs/HLD/06-code-structure/speaker-notes.md; context/03/01-listening-journey/speaker-notes.md; context/03/03-manual-controls/speaker-notes.md
Visual: [Permission and setup evidence gap](visual.mmd).
OBSERVED: Start Listening disables its button and shows requesting permission; success requires getUserMedia, AudioContext creation/resume and analyser setup before ticks and Listening status.
OBSERVED: Caught permission/setup errors display error plus err.name, enable retry and render zero duration. No explicit stream-stop or AudioContext-close cleanup appears in that failure path.
OBSERVED: No stop-listening control or browser capability precheck is supplied. Manual STOP only changes feedback; listening ticks overwrite manual choices.
DOCUMENTED: HLD says open index.html in a browser but provides no browser/version support matrix or failure/recovery observations.
INFERRED: Failure after acquiring a stream may leave resources active; lifetime and recovery require runtime evidence.
UNVERIFIED: Denial, pending/dismissed permission, unavailable devices, setup/resume failure, retry and missing API behavior lack supplied execution records.
UNVERIFIED: Browser/version, OS, device, page-origin compatibility, background-tab cadence and suspended audio behavior are not demonstrated.
Baseline questions: Which browser versions, devices and origins actually supported claimed microphone access? What records distinguish local-file and hosted operation?
Baseline questions: What appeared after denial, unavailable microphone or audio setup failure? Did retry succeed, and what happened to acquired streams?
Baseline questions: What observations exist for pending permission, later revocation, device loss and backgrounding? Did displayed status match capture?
Baseline questions: Were manual controls observed while listening? What evidence supports actual cadence rather than assuming the requested 100 ms interval?
Uncertainties: Supported environments, actual error names, partial-setup cleanup and recovery outcomes remain unknown.
Contradictions: None observed for the documented request/setup path versus source; missing failure/compatibility evidence is absence rather than a conflicting result.
Evidence limit: No browser session, network action, application test, compatibility promise, acceptance threshold or approval performed.
Authoring operations: Initial shell heredoc failed because temporary-file creation was denied; Python retry failed because developer tools were unavailable. Neither wrote documentation; patch-based authoring succeeded.
Run: 20261014T205435Z-149579087f.
