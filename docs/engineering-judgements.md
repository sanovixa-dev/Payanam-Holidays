# Engineering Judgment — the pass to run before each task

The goal of this project (and the next few) is not "how to code" — it's the
judgment _around_ the code: technique selection, delegation, attention, autonomy.
Run this pass during the build. Fast pass on everything; full pass when triggered.

THE JUDGMENT PASS (before each task)

Fast pass (always, ~20 sec):
"If I get this wrong — how far does the damage spread,
and how hard is it to undo?"
→ Small + reversible → just build it (alone, autopilot, delegatable). Done.
→ Large / irreversible / foundational → run the FULL pass ↓

Full pass (only when triggered, ~2-3 min):

1. CATEGORY → what kind of problem? (data / reliability / identity /
   load / transform-sort / structure / async / integration)
   → that names the technique family
2. BLAST RADIUS → how bad if wrong? (confirm it's really high)
3. ATTENTION → foundational or irreversible? → full focus, no distractions
4. DELEGATION → novel × high-risk? → keep or pair closely (delegate by RISK, not difficulty)
5. AUTONOMY → internals = change alone · shared contract/ADR = involve team

The one axis under all of it: reversibility × blast radius.
