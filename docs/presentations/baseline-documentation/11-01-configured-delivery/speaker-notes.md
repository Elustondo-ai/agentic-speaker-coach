AI-MODIFIED - 2026-10-14T21:06:49Z
# What delivery behavior is configured?
Agent: ASDLC-11
Sources: source/.github/workflows/azure-static-web-apps-zealous-mud-0e4c64510.yml; context/05/03-runtime-hosting-and-authoring-boundaries/speaker-notes.md; context/routing-and-executions.json
Visual: [Configured event paths](visual.mmd).
OBSERVED: Workflow triggers main pushes and pull requests targeting main for opened, synchronize, reopened and closed events.
OBSERVED: Upload job runs for pushes or non-closed PR events on ubuntu-latest; checkout@v3 enables submodules and disables LFS.
OBSERVED: Job permissions are contents: read and id-token: write. It installs @actions/core@1.6.0 and @actions/http-client, then github-script@v6 requests an ID token.
OBSERVED: Azure/static-web-apps-deploy@v1 receives action upload, a named secret reference and the ID-token result; app_location is /, output_location is . and api_location is empty.
OBSERVED: Closed PRs select a separate close job using the same Azure action with action close. No merged-only condition exists, so configuration includes merged and unmerged closures.
OBSERVED: The close step supplies neither the upload job's secret reference nor github_id_token; it has no checkout or explicit token-acquisition step.
INFERRED: The close action is intended to close PR preview environments. Missing explicit credential inputs are an operational uncertainty, not proof of execution failure.
UNVERIFIED: Secret availability, OIDC trust, runner execution, artifact contents, upload success and PR preview creation/closure are not established.
UNVERIFIED: No supplied workflow run IDs/logs, deployment records, deployed URL, environment mapping or deployed revision establish staging or production behavior.
OBSERVED: No explicit rollback procedure, health check, user-acceptance gate or production promotion step appears in this workflow.
INFERRED: Absence of these steps in this file cannot establish absence of Azure-side settings or other operational procedures.
Uncertainties: Exact source commit and deployed revision are unknown; workflow resource name is not a verified URL. Rollout/rollback execution and close-action authentication remain unknown.
Contradictions: None observed between source workflow and supplied architecture context; configured delivery is not a claim of successful deployment.
Evidence limit: Static file inspection only. Root application README was absent; the initial combined read failed on its unmatched glob, and explicit file reads subsequently succeeded.
Status: ANSWER for configuration baseline; operational deployment verification is BLOCKED by missing evidence. No approval inferred; handoff not needed for this capture.
Run: 20261014T205435Z-149579087f.
