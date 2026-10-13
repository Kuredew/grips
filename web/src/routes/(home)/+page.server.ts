import { checkHealth } from '#lib/api/checkHealth.ts';
import { getAllChangelog } from '#lib/changelog.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const allChangelogs = await getAllChangelog();
	const changelogs = allChangelogs.slice(0, 3);
	const extractorOnline = await checkHealth();

	return {
		title: 'grips',
		description:
			'Download media, remux, and recode for you. It runs entirely in the browser and is ad- and tracker-free.',
		canonicalUrl: '/',
		changelogs,
		extractorOnline
	};
};
