AI-MODIFIED - 2026-10-14T20:57:39Z
# turn model
Agent: ASDLC-03
Sources: source/app.js; source/docs/Plan.md; source/docs/HLD/03-speech-detection/speaker-notes.md; source/docs/HLD/04-turn-state-machine/speaker-notes.md; source/docs/HLD/07-limits-and-roadmap/speaker-notes.md; context/01/03-terminology-and-evidence/speaker-notes.md
OBSERVED: Concepts are input level, qualifying sound, last sound time, turn start, duration, speaking indicator and feedback state.
OBSERVED: RMS strictly above 0.02 refreshes lastVoice and starts a turn only if none is active.
OBSERVED: Speaking is true when time since lastVoice is strictly less than 300 ms; it is separate from turn activity.
OBSERVED: Short pauses retain turn start and count toward elapsed duration; feedback can advance during quiet time.
OBSERVED: A tick resets the turn only after more than 2500 ms without qualifying sound; duration becomes zero and automatic feedback GOOD.
OBSERVED: Qualifying sound refreshes lastVoice before the reset check; sound after reset starts a new turn.
OBSERVED: GOOD applies through 25 seconds, LAND IT above 25 through 35, STOP above 35.
DOCUMENTED: HLD describes short pauses as part of an answer and warns that interviewer speech/background noise advances timing.
OBSERVED: Volume detection cannot distinguish the intended speaker from other speakers or loud sounds.
INFERRED: A detected turn need not equal one person's answer; noise can extend it and long silence can split an answer.
CONTRADICTED: Plan/HLD describe 45/75-second feedback; source implements strict greater-than 25/35.
UNVERIFIED: Detection accuracy, calibration and real interview behavior were not tested.
Uncertainties: Approved timing policy and correspondence with perceived answers are unknown. Initial lastVoice = 0 can briefly yield speaking true if a tick occurs before performance time reaches 300 ms.
Contradictions: Timing values conflict as above; HLD says reset after 2.5 seconds, code requires greater than 2.5 seconds evaluated on ticks.
Evidence limit: Static source inspection only; no replacement proposal, runtime verification or approval.
Run: 20261014T205435Z-149579087f.
