interface GitHubCommitResponse {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
}

export async function getLatestCommitHash(
  owner: string,
  repo: string,
  branch: string = 'main',
  token?: string
): Promise<string> {
  const url = `https://api.github.com/repos/${owner}/${repo}/commits/${branch}`;

  const headers: HeadersInit = {
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  const data: GitHubCommitResponse = await response.json();
  return data.sha;
}
