AI-MODIFIED - 2026-10-14T21:03:10Z
# How does the source turn model differ from HLD?
Agent: ASDLC-05
Sources: source/app.js; source/docs/Plan.md; source/docs/HLD/02-pipeline/slide.puml; source/docs/HLD/03-speech-detection/slide.puml; source/docs/HLD/03-speech-detection/speaker-notes.md; source/docs/HLD/04-turn-state-machine/slide.puml; source/docs/HLD/04-turn-state-machine/speaker-notes.md; source/docs/HLD/05-screen-mockup/speaker-notes.md; source/docs/HLD/06-code-structure/speaker-notes.md; context/03/02-turn-model/speaker-notes.md; context/04/02-pause-detection-and-boundaries/speaker-notes.md
Visual: [Source-derived timing and HLD drift](visual.mmd).
OBSERVED: RMS strictly above 0.02 refreshes lastVoice and starts an absent turn. The speaking indicator uses voice age strictly below 300 ms.
OBSERVED: Turn reset uses voice age strictly above 2500 ms, checked after refreshing lastVoice; exactly 2500 ms does not reset.
OBSERVED: Duration is elapsed time from turnStart, including retained pauses; it is neither accumulated voiced time nor a semantic answer duration.
DOCUMENTED: HLD pipeline labels the detector-to-timer edge speaking?; the detection sequence more accurately shows direct updates to lastVoice and turnStart.
OBSERVED: The timer does not consume the speaking boolean. Indicator hold and turn retention are separate calculations within tick, not separately instantiated processing components.
INFERRED: The HLD pipeline is a conceptual decomposition; interpreting its speaking? edge as the actual timer input would misrepresent source behavior.
OBSERVED: Automatic feedback is GOOD through 25 s, LAND IT above 25 through 35 s, and STOP above 35 s; every listening tick assigns a state.
CONTRADICTED: HLD/Plan specify 45/75 s; app.js constants and strict comparisons implement 25/35 s. Plan describes inclusive warning/stop boundaries, unlike source comparisons.
DOCUMENTED: HLD describes reset after 2.5 s silence; source refines that shorthand to greater than 2.5 s evaluated on ticks, not an exact deadline.
OBSERVED: Manual choices only change the panel and can be overwritten on the next listening tick; STOP does not stop capture. HLD screen notes describe the override.
CONTRADICTED: Plan lists automatic timing as a next increment while the supplied source already assigns automatic feedback; no chronology resolves this.
INFERRED: HLD's claim that color never goes backwards during a turn applies to automatic elapsed-time mapping; manual buttons can select any panel state without ending the turn.
UNVERIFIED: Timing policy approval, detection accuracy and requested versus actual polling latency have no supplied runtime evidence.
Uncertainties: No rationale or approved decision establishes why thresholds differ. Noise and other speakers are not distinguished; initial lastVoice = 0 can briefly affect speaking if an early tick occurs before 300 ms.
Contradictions: 45/75 versus 25/35 values and automatic-timing status conflict; the conceptual speaking? edge omits the actual direct turn-state updates. These remain unresolved findings.
Evidence limit: Static reconstruction; no new thresholds, ADR approval, tests or replacement proposal.
Run: 20261014T205435Z-149579087f.
