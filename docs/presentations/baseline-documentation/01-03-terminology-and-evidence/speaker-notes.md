AI-MODIFIED - 2026-10-14T20:55:28Z
# Terminology and evidence inventory
Agent: ASDLC-01
Sources: source/app.js; source/index.html; source/docs/Plan.md; source/docs/HLD/01-purpose/speaker-notes.md; source/docs/HLD/03-speech-detection/speaker-notes.md; source/docs/HLD/04-turn-state-machine/speaker-notes.md; context/routing-and-executions.json
OBSERVED: “Level” means RMS sample amplitude; “speaking” is a volume-based indicator with a 300 ms hold, not recognition of language or identity.
OBSERVED: A “turn” begins on a sample above 0.02 RMS and ends when time since last qualifying sample exceeds 2500 ms.
OBSERVED: “Duration” is elapsed time since turn start, including short pauses; it is not accumulated voiced time or the length of a semantically complete answer.
INFERRED: The domain's “answer” and the detector's “turn” may differ because speaker changes and noise are not distinguished.
OBSERVED: GOOD, LAND IT and STOP are display labels. STOP does not stop microphone capture; no stop-listening control is supplied.
CONTRADICTED: Plan/HLD timing descriptions use 45/75 seconds; code uses greater than 25 seconds for LAND IT and greater than 35 seconds for STOP.
DOCUMENTED: Plan.md labels microphone access, detection, duration and manual states “Already proven”; no supporting test records or measurements are included.
OBSERVED: The supplied inventory contains 22 source files: application pair, plan, seven visual/notes HLD pairs, editor adapter/settings and hosting workflow. No root application README is supplied.
DOCUMENTED: The context record identifies this run as isolated_codex_process, native_subagent false, with selected specialist stages; it is orchestration evidence, not product-use evidence.
UNVERIFIED: Real interview observations, stakeholder testimony, calibration results, supported browsers, accessibility experience, acceptance decisions and hosting outcomes are absent from supplied evidence.
Uncertainties: Meaning and ownership of timing policy; intended microphone/speaker arrangement; what users count as an answer; provenance and repeatability of “Already proven” claims.
Contradictions: Timing values conflict as above; Plan lists automatic timing as a next increment although app.js already performs automatic signal updates. Snapshot chronology is unavailable.
Review questions: Which timing policy is intended? Which users/settings are actually in use? What existing session, calibration and acceptance records support the documented claims?
Evidence limit: No runtime tests, external checks, approval or completed transfer are claimed. Run: 20261014T205435Z-149579087f.
