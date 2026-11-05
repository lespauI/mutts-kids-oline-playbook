# Mutts Kids O-line Playbook

A simple, interactive offensive line playbook for kids.

[Open the playbook](https://lespaui.github.io/mutts-kids-oline-playbook/)

## Play groups

- Middle and inside runs: 20, 21, 22, 23.
- Outside and stretch runs: 24, 25, 26.
- Pass protection: 60 right and 61 left.

Each play page shows the NT core, 3–4, and 4–3 looks. Kids can select an O-line position to read their job. Pass pages include Mike and backside blitz examples. The print option creates nine play pages, with three fronts on each page.

20 runs directly through center. 21 runs between C and LG. 22 runs between C and RG.

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
