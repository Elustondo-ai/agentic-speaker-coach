AI-MODIFIED - 2026-10-14T21:06:49Z
# What must the browser environment support?
Agent: ASDLC-11
Sources: source/app.js; source/index.html; source/docs/HLD/02-pipeline/speaker-notes.md; source/docs/HLD/06-code-structure/speaker-notes.md; context/04/03-permissions-and-browser-evidence/speaker-notes.md
Visual: [Browser setup and uncertainty](visual.mmd).
OBSERVED: A user click requests audio via navigator.mediaDevices.getUserMedia, creates/resumes AudioContext and connects the stream to an analyser before marking listening and requesting 100 ms ticks.
DOCUMENTED: HLD describes opening index.html locally and browser microphone permission; it supplies no support matrix or observed origin/browser/device combination.
INFERRED: Browser operation requires an available microphone, permitted access and working mediaDevices/getUserMedia and Web Audio APIs; the actual origin must satisfy the browser's capture security rules.
UNVERIFIED: A secure capture context, normally HTTPS or a browser-trusted local origin, is an operating prerequisite rather than a supplied observation. Local-file behavior and hosted-origin permissions are untested here.
OBSERVED: No secure-context or API-capability precheck appears. Setup errors show err.name and re-enable the button; successful setup disables further starts.
OBSERVED: No stop-listening control, stream-track stop, AudioContext close or interval cancellation appears. Manual STOP changes feedback only; subsequent ticks assign feedback again.
INFERRED: Failure after stream acquisition may leave capture resources active; device loss, permission revocation, suspension and background throttling may affect operation. No frequency or impact is measured.
OBSERVED: Audio samples are processed locally in the supplied app.js; no audio upload or backend call appears in the application pair.
UNVERIFIED: Browser/version, OS, device, actual origin, permission-grant/denial/retry outcomes, audio-resume results, capture indicators and background behavior have no supplied observation records.
Uncertainties: No device session or deployed page was inspected. Actual API support, capture lifetime and recovery behavior remain unknown; local processing alone does not establish full hosting/privacy properties.
Contradictions: None observed for the documented setup sequence versus source; undocumented compatibility and recovery behavior is missing evidence, not a conflicting result.
Evidence limit: Browser prerequisites are identified from API usage and general operating constraints; no browser, device, network or external documentation checks performed.
Run: 20261014T205435Z-149579087f.
