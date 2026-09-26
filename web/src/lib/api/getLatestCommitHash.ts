interface GitHubCommitResponse {
	sha: string;
}

export async function getLatestCommitHash(
	owner: string,
	repo: string,
	branchOrRef?: string,
	token?: string
): Promise<string> {
	const headers: Record<string, string> = {
		Accept: 'application/vnd.github+json',
		'X-GitHub-Api-Version': '2022-11-28',
		'User-Agent': 'TypeScript-Fetch-App'
	};

	if (token) {
		headers['Authorization'] = `Bearer ${token}`;
	}

	let url = `https://api.github.com/repos/${owner}/${repo}/commits`;

	if (branchOrRef) {
		url += `?sha=${encodeURIComponent(branchOrRef)}&per_page=1`;
	} else {
		url += `?per_page=1`;
	}

	try {
		const response = await fetch(url, { headers });

		if (!response.ok) {
			throw new Error(`GitHub API responded with status: ${response.status}`);
		}

		const commits = (await response.json()) as GitHubCommitResponse[];

		if (commits.length === 0) {
			throw new Error(`No commits found in the repository/branch.`);
		}

		return commits[0].sha;
	} catch (error) {
		console.error('Error fetching latest commit hash:', error);
		throw error;
	}
}
