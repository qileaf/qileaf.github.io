"use client";

import { useMemo, useState } from "react";

type Project = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  updated_at: string;
  fork: boolean;
  archived: boolean;
  featured?: boolean;
  annotation?: string;
};

type GithubData = {
  generatedAt: string;
  profile: {
    login: string;
    name: string | null;
    bio: string | null;
    avatar_url: string;
    public_repos: number;
    followers: number;
    html_url: string;
  };
  repositories: Project[];
};

type Profile = {
  displayName: string;
  role: string;
  headline: string;
  intro: string;
  location: string;
  availability: string;
  email: string;
  resumeUrl: string;
  skills: string[];
  featuredRepos: string[];
  hiddenRepos: string[];
  projectNotes: Record<string, string>;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function ProjectCard({
  project,
  index,
  large = false,
}: {
  project: Project;
  index: number;
  large?: boolean;
}) {
  return (
    <article className={`project-card ${large ? "project-card--large" : ""}`}>
      <div className="project-card__top">
        <span className="project-index">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="project-state">
          <i aria-hidden="true" />
          PUBLIC
        </span>
      </div>
      <div>
        <p className="eyebrow">
          {project.language || "Repository"} · Updated {formatDate(project.updated_at)}
        </p>
        <h3>{project.name.replaceAll("-", " ")}</h3>
        <p className="project-description">
          {project.annotation ||
            project.description ||
            "An open-source project from the qileaf workspace."}
        </p>
      </div>
      <div className="project-meta">
        {(project.topics || []).slice(0, 3).map((topic) => (
          <span key={topic}>{topic}</span>
        ))}
        {project.stargazers_count > 0 && (
          <span>★ {project.stargazers_count}</span>
        )}
      </div>
      <div className="project-actions">
        <a href={project.html_url} target="_blank" rel="noreferrer">
          View source <span aria-hidden="true">↗</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        {project.homepage && (
          <a href={project.homepage} target="_blank" rel="noreferrer">
            Live demo <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        )}
      </div>
    </article>
  );
}

export function Portfolio({
  profile,
  github,
}: {
  profile: Profile;
  github: GithubData;
}) {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);

  const projects = useMemo(
    () =>
      github.repositories
        .filter((repo) => !repo.archived && !profile.hiddenRepos.includes(repo.name))
        .map((repo) => ({
          ...repo,
          featured: profile.featuredRepos.includes(repo.name),
          annotation: profile.projectNotes[repo.name],
        })),
    [github.repositories, profile],
  );

  const featured = [
    ...projects.filter((project) => project.featured),
    ...projects.filter((project) => !project.featured && !project.fork),
  ].slice(0, 3);

  const languages = [
    "All",
    ...Array.from(
      new Set(projects.map((project) => project.language).filter(Boolean)),
    ).sort(),
  ] as string[];

  const visibleProjects = projects.filter((project) => {
    const haystack = [
      project.name,
      project.description,
      project.language,
      ...(project.topics || []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return (
      haystack.includes(query.toLowerCase()) &&
      (language === "All" || project.language === language)
    );
  });

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="qileaf home">
          <span className="brand-mark">Q/</span>
          <span>{profile.displayName || github.profile.name || "qileaf"}</span>
        </a>
        <button
          className="menu-button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>
        <nav className={menuOpen ? "nav-open" : ""} aria-label="Primary navigation">
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <a
            className="nav-github"
            href={github.profile.html_url}
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-orbit" aria-hidden="true">
          <span className="orbit orbit-one" />
          <span className="orbit orbit-two" />
          <span className="orbit-core">Q</span>
          <span className="orbit-label orbit-label--one">BUILD</span>
          <span className="orbit-label orbit-label--two">SHIP</span>
          <span className="orbit-label orbit-label--three">ITERATE</span>
        </div>
        <div className="hero-copy">
          <div className="status-pill">
            <span aria-hidden="true" />
            {profile.availability}
          </div>
          <p className="hero-kicker">{profile.role}</p>
          <h1>
            I build software
            <br />
            <em>that earns its place.</em>
          </h1>
          <p className="hero-intro">{profile.headline}</p>
          <div className="hero-actions">
            <a className="button button--primary" href="#work">
              Explore my work <span aria-hidden="true">↓</span>
            </a>
            <a
              className="button button--ghost"
              href={github.profile.html_url}
              target="_blank"
              rel="noreferrer"
            >
              GitHub profile ↗
            </a>
          </div>
        </div>
        <div className="scroll-cue" aria-hidden="true">
          <span>SCROLL TO EXPLORE</span>
          <i />
        </div>
      </section>

      <section className="section" id="work">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / Selected work</p>
            <h2>Built with intent.</h2>
          </div>
          <p>
            A selection of active, documented projects ranked from my public
            GitHub work.
          </p>
        </div>
        <div className="featured-grid">
          {featured.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} large />
          ))}
        </div>
      </section>

      <section className="section repository-section" id="repositories">
        <div className="section-heading section-heading--compact">
          <div>
            <p className="eyebrow">02 / Repository index</p>
            <h2>More from the lab.</h2>
          </div>
          <span className="result-count">
            {String(visibleProjects.length).padStart(2, "0")} projects
          </span>
        </div>
        <div className="project-controls">
          <label className="search-box">
            <span className="sr-only">Search projects</span>
            <span aria-hidden="true">⌕</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search projects, topics, languages…"
            />
          </label>
          <label className="language-select">
            <span className="sr-only">Filter by language</span>
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
            >
              {languages.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="repository-grid">
          {visibleProjects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
        {visibleProjects.length === 0 && (
          <p className="empty-state">No projects match that signal. Try another search.</p>
        )}
      </section>

      <section className="section about" id="about">
        <div>
          <p className="eyebrow">03 / About</p>
          <h2>Curious by default.<br />Deliberate in execution.</h2>
        </div>
        <div className="about-copy">
          <p>{profile.intro || github.profile.bio}</p>
          <p>
            I care about clear thinking, durable systems, and interfaces that
            make complex ideas feel simple.
          </p>
          <div className="skills">
            {profile.skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <p className="eyebrow">04 / Start a conversation</p>
        <h2>Have an interesting<br />problem to solve?</h2>
        <p>
          I’m always open to thoughtful conversations about software,
          collaboration, and the next useful thing to build.
        </p>
        <div className="hero-actions">
          {profile.email.includes("@") && !profile.email.includes("example") ? (
            <a className="button button--primary" href={`mailto:${profile.email}`}>
              Send an email ↗
            </a>
          ) : (
            <a
              className="button button--primary"
              href={github.profile.html_url}
              target="_blank"
              rel="noreferrer"
            >
              Connect on GitHub ↗
            </a>
          )}
          {profile.resumeUrl && profile.resumeUrl !== "#" && (
            <a className="button button--ghost" href={profile.resumeUrl}>
              View résumé ↗
            </a>
          )}
        </div>
      </section>

      <footer>
        <span>© {new Date().getFullYear()} {profile.displayName || "qileaf"}</span>
        <span>Designed with intent · Built from public GitHub data</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
