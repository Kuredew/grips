import { getAllChangelog } from '#lib/changelog.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const changelogs = await getAllChangelog();
	const latestVersion = changelogs[0]?.version;

	return {
		title: 'Changelogs',
		description: 'See what’s new, what’s fixed, and what’s cooking.',
		canonicalUrl: '/changelogs',
		latestVersion
	};
};
