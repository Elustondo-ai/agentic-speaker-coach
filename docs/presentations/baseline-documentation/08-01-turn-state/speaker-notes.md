AI-MODIFIED - 2026-10-14T21:04:55Z
# Tick and turn state
Agent: ASDLC-08
Sources: source/app.js; source/docs/HLD/03-speech-detection/speaker-notes.md; context/03/02-turn-model/speaker-notes.md
Visual: [Tick contract](visual.mmd).
OBSERVED: mic starts with status=off, level=0, speaking=false, turnStart=null, lastVoice=0.
OBSERVED: tick(analyser, buf) reads float time-domain samples and computes RMS as sqrt(sum of squared samples / buffer length).
OBSERVED: RMS strictly greater than 0.02 refreshes lastVoice and sets turnStart only when null; equality does not qualify.
OBSERVED: speaking requires voice age strictly less than 300 ms; exactly 300 ms is false. This boolean does not gate duration.
OBSERVED: An active turn resets only when voice age is strictly greater than 2500 ms; equality retains it.
OBSERVED: Voice refresh precedes reset checking. Returning sound preserves the old turn if no intervening tick reset it.
OBSERVED: Duration is zero for null turnStart, otherwise (now-turnStart)/1000. Short pauses count toward elapsed duration even while speaking=false.
OBSERVED: renderDebug(durationS) writes status, speaking, duration to one decimal and RMS to three decimals; decisions use unrounded values.
DOCUMENTED: HLD describes 300 ms hold and reset after 2.5 s silence.
INFERRED: lastVoice=0 can briefly yield speaking=true without detected voice if an early tick occurs before performance time reaches 300 ms.
UNVERIFIED: Calibration, natural-pause behavior and actual scheduling were not exercised.
Uncertainties: Sample inputs and correspondence between detected turns and human answers remain unknown.
Contradictions: HLD silence shorthand omits strict greater-than and tick evaluation; this boundary-description discrepancy remains unresolved.
Evidence limit: Static reconstruction only; no runtime tests or approval.
Run: 20261014T205435Z-149579087f.
