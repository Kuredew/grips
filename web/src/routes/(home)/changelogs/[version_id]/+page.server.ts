import { getAllChangelog } from '#lib/changelog.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const version = params.version_id;

	const allChangelogs = await getAllChangelog();
	let currentChangelog = null;
	let currentIndex = 0;

	for (const [index, changelog] of allChangelogs.entries()) {
		if (changelog.version == version) {
			currentChangelog = changelog;
			currentIndex = index;
		}
	}

	const prevChangelogVersion = allChangelogs[currentIndex + 1]?.version;
	const nextChangelogVersion = allChangelogs[currentIndex - 1]?.version;

	return {
		type: 'article',
		title: currentChangelog?.changelog.metadata.title,
		description: 'See what’s new, what’s fixed, and what’s cooking.',
		canonicalUrl: '/changelogs/' + version,
		currentChangelog,
		prevChangelogVersion,
		nextChangelogVersion
	};
};
