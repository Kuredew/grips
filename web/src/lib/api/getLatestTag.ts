interface GitHubTagResponse {
	name: string;
}

interface GitHubReleaseResponse {
	tag_name: string;
}

export async function getLatestTag(
	owner: string,
	repo: string,
	token?: string
): Promise<string | null> {
	const headers: Record<string, string> = {
		Accept: 'application/vnd.github+json',
		'X-GitHub-Api-Version': '2022-11-28',
		'User-Agent': 'TypeScript-Fetch-App'
	};

	if (token) {
		headers['Authorization'] = `Bearer ${token}`;
	}

try {
			const releaseUrl = `https://api.github.com/repos/${owner}/${repo}/releases/latest`;
			const releaseResponse = await fetch(releaseUrl, { headers });

			if (releaseResponse.ok) {
				const data = (await releaseResponse.json()) as GitHubReleaseResponse;
				return data.tag_name;
			}

			const tagsUrl = `https://api.github.com/repos/${owner}/${repo}/tags?per_page=1`;
			const tagsResponse = await fetch(tagsUrl, { headers });

		if (!tagsResponse.ok) {
			throw new Error(`GitHub API responded with status: ${tagsResponse.status}`);
		}

		const tagsData = (await tagsResponse.json()) as GitHubTagResponse[];

		if (tagsData.length > 0) {
			return tagsData[0].name;
		}

		return null;
	} catch (error) {
		console.error('Error fetching latest GitHub tag:', error);
		throw error;
	}
}
