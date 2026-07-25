import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("profile configuration has required editable fields", async () => {
  const profile = JSON.parse(
    await readFile(new URL("data/profile.json", root), "utf8"),
  );
  assert.equal(typeof profile.displayName, "string");
  assert.equal(typeof profile.headline, "string");
  assert.ok(Array.isArray(profile.featuredRepos));
  assert.ok(Array.isArray(profile.hiddenRepos));
});

test("cached GitHub data remains renderable when fields are missing", async () => {
  const github = JSON.parse(
    await readFile(new URL("data/github.json", root), "utf8"),
  );
  assert.equal(github.profile.login, "qileaf");
  assert.ok(Array.isArray(github.repositories));
  for (const repo of github.repositories) {
    assert.equal(typeof repo.name, "string");
    assert.match(repo.html_url, /^https:\/\/github\.com\/qileaf(?:\/|$)/);
    assert.ok(Array.isArray(repo.topics));
  }
});

test("GitHub Pages workflow publishes the static export", async () => {
  const workflow = await readFile(
    new URL(".github/workflows/pages.yml", root),
    "utf8",
  );
  assert.match(workflow, /actions\/deploy-pages@v4/);
  assert.match(workflow, /path: \.\/out/);
  assert.match(workflow, /schedule:/);
});
