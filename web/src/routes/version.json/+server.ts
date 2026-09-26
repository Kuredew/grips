import { getLatestCommitHash } from '$lib/api/getLatestCommitHash';
import { getLatestTag } from '$lib/api/getLatestTag';
import { json } from '@sveltejs/kit';

export async function GET() {
	const defaultHash = await getLatestCommitHash('kuredew', 'grips');
	const shortHash = defaultHash.substring(0, 7);

	const latestTag = await getLatestTag('kuredew', 'grips');

	return json({
		commit: shortHash,
		version: latestTag
	});
}
