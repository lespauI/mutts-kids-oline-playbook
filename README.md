# Mutts Kids O-line Playbook

A simple, interactive offensive line playbook for kids.

[Open the playbook](https://lespaui.github.io/mutts-kids-oline-playbook/)

## Play groups

- Middle runs: 20, 21, 22.
- Outside runs: 23 left and 24 right.
- Stretch runs: 25 left and 26 right.
- Pass protection: 60 right and 61 left.

Each play page shows the NT core, 3–4, and 4–3 looks. Stretch pages also show a 5-tech look with the inside clear. Kids can select an O-line position to read their job. Pass pages include Mike and backside blitz examples. The print option creates nine play pages. Middle, outside, and pass pages show three looks. Stretch pages show four looks.

20 runs directly through center. 21 runs between C and LG. 22 runs between C and RG.

## Stretch pull rules

- With an NT, the backside guard pulls: RG on 25 left; LG on 26 right. C stays on N.
- With a 3-tech, C and the backside guard call one puller. The other player blocks the 3-tech. The page shows either call.
- With a 5-tech and no inside NT or 3-tech, C pulls.

The NT or inside 3-tech takes priority over a 5-tech end. Inside blockers close the pulling player’s gap. The puller leads outside and blocks the first free threat.

The coach notes in the playbook explain the blocking fits and edge help.

## Local preview

Open `index.html` in a browser. You can also run:

```sh
python3 -m http.server 8080
```

Then open http://localhost:8080.

## Update the site

Edit `index.html`, commit the change, and push to `main`. GitHub Actions deploys the page to GitHub Pages. No build step, external scripts, or account secrets are required.

The workflow publishes only `index.html` and `.nojekyll`. Source PDFs are not included.
