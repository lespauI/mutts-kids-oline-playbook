# Mutts Kids O-line Playbook

A simple, interactive offensive line playbook for kids.

[Open the playbook](https://lespaui.github.io/mutts-kids-oline-playbook/)

## Play groups

- Middle runs: 20, 21, 22.
- Outside runs: 23 left and 24 right.
- Stretch runs: 25 left and 26 right.
- Pass protection: 60 right and 61 left.

Each play page shows the NT core, 3–4, and 4–3 looks. Stretch pages also show a 5-tech look with the inside clear. Kids can select an O-line position to read their job. Pass pages include Mike, backside, single-edge, and edge-plus-Mike examples. EDGE is a called exchange; the overload needs a QB hot route or a protection check. The print option creates nine play pages. Middle, outside, and pass pages show three looks. Stretch pages show four looks.

20 runs directly through center. 21 runs between C and LG. 22 runs between C and RG.

## Stretch pull rules

- With an NT, the backside guard pulls: RG on 25 left; LG on 26 right. C stays on N.
- With a 3-tech, C and the backside guard call one puller. The other player blocks the 3-tech. The page shows either call.
- With a 5-tech and no inside NT or 3-tech, C pulls.

The NT or inside 3-tech takes priority over a 5-tech end. Inside blockers secure the pulling player’s gap before he leaves. A free inside threat stops the pull. The page includes a STAY/CHECK example for that condition. The puller leads outside only after inside coverage is secure.

## Scheme review

The drawings show O-line teaching fits. They do not show every block in an 11-player formation. Visible card notes identify run pursuit and box defenders who still need a coach-assigned block, read, or check. A pulling player’s flow read does not replace an answer for an immediate inside fill.

Pass defenders use solid outlines for the current rush and dashed outlines for read threats. A lone slide-edge blitz can use a called exchange when Mike drops and the inside is clear. Edge plus Mike is a local overload of the three slide blockers. The page identifies the outside hot threat and requires the QB’s called hot route or a protection check.

HB arrows are landmarks. The runner follows the open crease rather than forcing a closed lane.

Coaching references: [Ken Wilmesherr on slide protection](https://gridironstrategies.com/article/slide-protection-schemes-and-technique-the-3-step-passing-game) and [Keith Grabowski on pin-and-pull](https://blogs.usafootball.com/blog/554/alternatives-to-the-diamond-pistol).

The coach notes in the playbook explain the blocking fits and edge help.

## Checks

Run the scheme regression checks with Node.js:

```sh
node scripts/check-playbook.cjs
```

GitHub Actions runs these checks before each deployment. The checks cover the coach’s play numbers, EDGE exchanges, outside hot threats, pull coverage, and visible support jobs. The coach still assigns the full formation’s support jobs.

## Local preview

Open `index.html` in a browser. You can also run:

```sh
python3 -m http.server 8080
```

Then open http://localhost:8080.

## Update the site

Edit `index.html`, commit the change, and push to `main`. GitHub Actions deploys the page to GitHub Pages. No build step, external scripts, or account secrets are required.

The workflow publishes only `index.html` and `.nojekyll`. Source PDFs are not included.
