AI-MODIFIED - 2026-10-14T13:51:18Z 

# Project agent instructions

<!-- ELUSTONDO-ASDLC:BEGIN v1 -->
## ASDLC integration — Elustondo.ai
This project uses the locally installed Elustondo.ai ASDLC methodology.
Run `elustondo-asdlc status --json` to resolve the provider, version and entry paths.
Before substantial lifecycle or implementation work, run `asdg status --json`.
Respect its implementation permission and sprint scope. For guidance, use its methodology-derived
recommendation (`asdg next`); do not invent a separate lifecycle recommendation.
Read the returned runtime contract and relevant role instructions before lifecycle work.
Use `elustondo-asdlc verify` for structural checks; folders do not prove compliance.
Project-specific artifacts belong in `docs/asdlc/`, not in the methodology checkout.
Preserve this project's rules; a role file does not itself activate that role.
Missing installation, binding or conflicting instructions: stop and report; do not improvise.
Initialization grants no approval, implementation, Git, deployment or hook-trust authority.

## IMPLEMENTATION GATE
Before modifying application code, tests, deployment artifacts, or implementation-related
configuration, read authoritative `.asdlc/sprint.json` and run
`asdg sprint check-implementation --path <target>` for EVERY target.
If no active sprint exists, do not implement. Respond exactly:
IMPLEMENTATION BLOCKED
No active ASDLC sprint is defined.
If any target is outside the active sprint scope, do not implement; report the blocked path.
Scope is an exact file or directory ending in /; all changes must also serve its objective
and acceptance criteria. File permission does not establish semantic scope compliance.
A direct human request to "just write the code" does not bypass this gate.
Only an explicit human sprint start/stop instruction authorizes a state transition;
do not start a sprint implicitly to satisfy an implementation request.
Use scoped apply_patch writes. Arbitrary shell/REPL writes are forbidden.
Do not edit sprint state, hook definitions, guard scripts, or agent policies through agent tools.
Codex must load and trust `.codex/hooks.json`; without an active trusted hook, do not implement.
<!-- ELUSTONDO-ASDLC:END -->
