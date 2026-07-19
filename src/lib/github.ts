const GITHUB_API = "https://api.github.com";

function repoConfig() {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO ?? process.env.NEXT_PUBLIC_GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH ?? "main";
  return { token, repo, branch };
}

export function isGitHubConfigured(): boolean {
  const { token, repo } = repoConfig();
  return Boolean(token && repo && repo.includes("/"));
}

export type GitHubResult = {
  ok: boolean;
  error?: string;
  commitUrl?: string;
};

async function ghFetch(
  path: string,
  init: RequestInit,
  token: string
): Promise<Response> {
  return fetch(`${GITHUB_API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(init.headers ?? {}),
    },
  });
}

/**
 * Commit a file (content.json) to the configured repo.
 * Creates or updates the file on the given branch.
 */
export async function commitContentFile(
  content: unknown,
  message: string
): Promise<GitHubResult> {
  const { token, repo, branch } = repoConfig();
  if (!token || !repo) {
    return { ok: false, error: "GitHub is not configured" };
  }

  const path = "src/lib/content.override.json";
  const body = JSON.stringify(content, null, 2);
  const encoded = Buffer.from(body, "utf-8").toString("base64");

  try {
    // Fetch current file (to get sha if it exists)
    let sha: string | undefined;
    const getRes = await ghFetch(
      `/repos/${repo}/contents/${path}?ref=${branch}`,
      { method: "GET" },
      token
    );
    if (getRes.ok) {
      const data = (await getRes.json()) as { sha?: string };
      sha = data.sha;
    } else if (getRes.status !== 404) {
      const err = await getRes.text();
      return { ok: false, error: `Failed to read repo file: ${err}` };
    }

    const putRes = await ghFetch(
      `/repos/${repo}/contents/${path}`,
      {
        method: "PUT",
        body: JSON.stringify({
          message,
          content: encoded,
          branch,
          ...(sha ? { sha } : {}),
        }),
      },
      token
    );

    if (!putRes.ok) {
      const err = await putRes.text();
      return { ok: false, error: `Commit failed: ${err}` };
    }
    const data = (await putRes.json()) as {
      commit?: { html_url?: string };
    };
    return { ok: true, commitUrl: data.commit?.html_url };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "GitHub request failed",
    };
  }
}

export type SubmissionInput = {
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

/**
 * Create a GitHub Issue for a new contact submission so it reaches the owner
 * and survives serverless environments.
 */
export async function createSubmissionIssue(
  sub: SubmissionInput
): Promise<GitHubResult> {
  const { token, repo } = repoConfig();
  if (!token || !repo) {
    return { ok: false, error: "GitHub is not configured" };
  }

  const title = `New enquiry from ${sub.name}`;
  const bodyText = `## New contact form submission

**Name:** ${sub.name}
**Email:** ${sub.email}
**Received:** ${sub.createdAt}

### Message
${sub.message}

---
_This issue was created automatically from the portfolio contact form._`;

  try {
    const res = await ghFetch(
      `/repos/${repo}/issues`,
      {
        method: "POST",
        body: JSON.stringify({ title, body: bodyText, labels: ["enquiry"] }),
      },
      token
    );
    if (!res.ok) {
      const err = await res.text();
      return { ok: false, error: `Issue creation failed: ${err}` };
    }
    const data = (await res.json()) as { html_url?: string };
    return { ok: true, commitUrl: data.html_url };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "GitHub request failed",
    };
  }
}

export type SubmissionIssue = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  url: string;
};

/**
 * Fetch contact-form submissions stored as GitHub Issues.
 */
export async function fetchSubmissionIssues(): Promise<SubmissionIssue[]> {
  const { token, repo } = repoConfig();
  if (!token || !repo) return [];

  try {
    const res = await ghFetch(
      `/repos/${repo}/issues?labels=enquiry&state=all&per_page=100`,
      { method: "GET" },
      token
    );
    if (!res.ok) return [];
    const issues = (await res.json()) as Array<{
      number: number;
      title: string;
      body?: string;
      created_at?: string;
      html_url?: string;
    }>;

    return issues
      .map((issue) => {
        const fields = parseIssueBody(issue.body ?? "");
        return {
          id: String(issue.number),
          name: fields.name || issue.title.replace(/^New enquiry from /, ""),
          email: fields.email,
          message: fields.message,
          createdAt: issue.created_at ?? new Date().toISOString(),
          url: issue.html_url ?? "",
        };
      })
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  } catch {
    return [];
  }
}

function parseIssueBody(body: string): {
  name: string;
  email: string;
  message: string;
} {
  const get = (label: string) =>
    body.match(new RegExp(`\\*\\*${label}:\\*\\*\\s*(.+)`, "i"))?.[1]?.trim() ?? "";
  const msgMatch = body.match(/### Message\s*\n([\s\S]*?)\n---/i);
  return {
    name: get("Name"),
    email: get("Email"),
    message: msgMatch?.[1]?.trim() ?? "",
  };
}
