import { getLatestCommitHash } from "#lib/api/github.ts";
import { getAllChangelog } from "#lib/changelog.ts";

export const load = async () => {
  const changelogs = await getAllChangelog()
  const latestChangelog = changelogs[0]
  const latestCommitHash = (await getLatestCommitHash('Kuredew', 'grips')).substring(0, 7)

	return {
		title: 'Start',
		description:
			'Paste the link, select the media type, and get started! Your media will arrive shortly.',
		canonicalUrl: '/start',
    latestChangelog,
		latestCommitHash
	};
};
