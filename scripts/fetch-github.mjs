import { readFile, writeFile } from "node:fs/promises";

const username = "qileaf";
const output = new URL("../data/github.json", import.meta.url);
const config = JSON.parse(
  await readFile(new URL("../data/profile.json", import.meta.url), "utf8"),
);

function score(repo) {
  const ageInDays = Math.max(
    1,
    (Date.now() - new Date(repo.updated_at).getTime()) / 86_400_000,
  );
  return (
    (repo.fork ? -30 : 0) +
    (repo.archived ? -100 : 0) +
    (repo.description ? 18 : 0) +
    (repo.homepage ? 12 : 0) +
    Math.min(repo.topics?.length || 0, 5) * 3 +
    Math.log2(repo.stargazers_count + 1) * 8 +
    Math.max(0, 16 - ageInDays / 45) +
    (config.featuredRepos.includes(repo.name) ? 1000 : 0)
  );
}

async function getJson(url) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "qileaf-portfolio-build",
      ...(process.env.GITHUB_TOKEN
        ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
        : {}),
    },
  });
  if (!response.ok) throw new Error(`GitHub API returned ${response.status}`);
  return response.json();
}

try {
  const [profile, repositories] = await Promise.all([
    getJson(`https://api.github.com/users/${username}`),
    getJson(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
    ),
  ]);

  const cleanRepos = repositories
    .filter((repo) => !config.hiddenRepos.includes(repo.name))
    .sort((a, b) => score(b) - score(a))
    .map((repo) => ({
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      homepage: repo.homepage || null,
      language: repo.language,
      topics: repo.topics || [],
      stargazers_count: repo.stargazers_count,
      updated_at: repo.updated_at,
      fork: repo.fork,
      archived: repo.archived,
    }));

  await writeFile(
    output,
    `${JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        profile: {
          login: profile.login,
          name: profile.name,
          bio: profile.bio,
          avatar_url: profile.avatar_url,
          public_repos: profile.public_repos,
          followers: profile.followers,
          html_url: profile.html_url,
        },
        repositories: cleanRepos,
      },
      null,
      2,
    )}\n`,
  );
  console.log(`Updated portfolio data with ${cleanRepos.length} repositories.`);
} catch (error) {
  console.warn(`GitHub refresh skipped: ${error.message}`);
  console.warn("Using the last committed data snapshot.");
}
