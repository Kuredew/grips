import { getAllChangelog } from '#lib/changelog.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const allChangelogs = await getAllChangelog();
	const changelogs = allChangelogs.slice(0, 3);

	return { changelogs };
};
