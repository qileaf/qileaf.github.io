# qileaf portfolio

A static, recruiter-focused portfolio powered by qileaf's public GitHub data.

## Personalize

Edit `data/profile.json` to update the display name, role, biography, email,
resume URL, and skills. Add repository names to `featuredRepos` to pin them,
`hiddenRepos` to omit them, or `projectNotes` to replace a repository's card
description.

## Run locally

```bash
npm install
npm run dev
```

`npm run build` refreshes public GitHub data and creates the static site in
`out/`. If GitHub cannot be reached, the last committed data snapshot is used.

## Publish with GitHub Pages

1. Push this project to a repository under the `qileaf` account.
2. Open **Settings → Pages** in that repository.
3. Under **Build and deployment**, select **GitHub Actions** as the source.
4. Push to `main` or run the workflow manually from the **Actions** tab.

The workflow automatically handles both a `qileaf.github.io` user site and a
project site hosted under `qileaf.github.io/repository-name/`. It refreshes the
public project feed nightly.
