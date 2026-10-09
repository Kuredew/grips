import { getAllChangelog } from '#lib/changelog.ts';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const changelogs = await getAllChangelog();
	const latest = changelogs[0]?.version;

	return redirect(303, `/changelogs/${latest}`);
};
