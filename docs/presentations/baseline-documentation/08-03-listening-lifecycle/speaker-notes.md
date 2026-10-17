AI-MODIFIED - 2026-10-14T21:04:55Z
# Listening resources and failure boundary
Agent: ASDLC-08
Sources: source/app.js; source/index.html; context/05/03-runtime-hosting-and-authoring-boundaries/speaker-notes.md
Visual: [Listening lifecycle](visual.mmd).
OBSERVED: startListening() disables the button, sets status=requesting permission and renders zero duration before awaiting getUserMedia({audio:true}).
OBSERVED: Success creates AudioContext, awaits resume(), creates analyser with fftSize=2048, connects MediaStreamSource and allocates Float32Array(2048).
OBSERVED: status becomes listening; setInterval requests tick(analyser,buf) every 100 ms; button text becomes Listening and stays disabled.
OBSERVED: tick uses performance.now() elapsed time rather than callback counts; requested polling is not measured cadence.
OBSERVED: catch(err) reports error plus err.name, re-enables the button and renders zero duration; there is no stage-specific error classification.
OBSERVED: stream and ctx are local; interval handle is discarded. No clearInterval, track.stop(), disconnect(), AudioContext.close() or stop-listening function appears in app.js.
OBSERVED: index.html has no stop-listening control; Stop only selects panel feedback. No unload handler or catch cleanup is present.
INFERRED: Failure after acquisition can leave resources without application-directed cleanup; retry is possible and effects depend on failure stage.
DOCUMENTED: Context describes local browser audio processing; it supplies no live-session trace.
UNVERIFIED: Permission behavior, API failure paths, scheduling and browser-managed disposal were not exercised.
Uncertainties: Actual resource lifetimes and browser/origin behavior are unknown; absent cleanup does not prove capture persists after page destruction.
Contradictions: None observed for this lifecycle boundary in cited evidence; timing drift remains unresolved in unit 02.
Evidence limit: Static inspection only. Shell here-document write failed on temporary-file permissions; Python write failed because developer tools were unavailable. Files were subsequently authored with apply_patch; no runtime tests or approval.
Run: 20261014T205435Z-149579087f.
