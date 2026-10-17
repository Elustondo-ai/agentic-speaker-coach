AI-MODIFIED - 2026-10-14T21:03:10Z
# What runs inside the browser?
Agent: ASDLC-05
Sources: source/app.js; source/index.html; source/docs/HLD/02-pipeline/slide.puml; source/docs/HLD/02-pipeline/speaker-notes.md; source/docs/HLD/06-code-structure/slide.puml; source/docs/HLD/06-code-structure/speaker-notes.md; context/03/01-listening-journey/speaker-notes.md
Visual: [Browser audio pipeline](visual.mmd).
OBSERVED: index.html supplies styling, panel, debug box and controls, and loads app.js; app.js owns all supplied application behavior.
OBSERVED: Start Listening disables the button and displays requesting permission before awaiting getUserMedia({audio: true}).
OBSERVED: Success creates/resumes AudioContext, connects a MediaStreamAudioSourceNode to an AnalyserNode and allocates 2048 float samples; no connection to an audio output destination is present.
OBSERVED: A requested 100 ms interval reads time-domain samples, calculates RMS and updates one mic object plus DOM text/styles. Listening status is set after setup.
DOCUMENTED: HLD describes microphone permission, Web Audio analysis, RMS detection, turn timing and panel/debug output as a deterministic local pipeline.
OBSERVED: setState is shared by manual buttons and automatic ticks; renderDebug reports status, speaking, one-decimal duration and three-decimal RMS level.
INFERRED: The runtime dependency direction is page controls to app behavior to browser media/audio APIs; computed state feeds the DOM. There is no supplied browser framework or backend dependency.
OBSERVED: Caught startup/setup errors show err.name, enable retry and render zero duration. The catch does not stop an acquired stream or close an AudioContext.
OBSERVED: No stop-listening control, stored interval handle, explicit stream cleanup, audio recording, upload or persistence path appears in app.js.
UNVERIFIED: Permission outcomes, partial-setup resource lifetime, browser compatibility and actual interval cadence were not executed or measured.
Uncertainties: Supported browser/device/origin and behavior after device loss or later permission revocation are unavailable; the supplied source has no root application README.
Contradictions: No structural conflict with the HLD browser pipeline or two-file application description; timing and detector-to-timer simplifications are recorded in unit 02.
Evidence limit: OBSERVED means static source inspection, not observed audio execution. No redesign, application change or approval.
Run: 20261014T205435Z-149579087f.
