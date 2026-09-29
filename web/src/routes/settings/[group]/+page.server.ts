import { settings } from '$lib/settings.svelte';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const group = params.group;

	const groupSettings = settings.schema.filter((m) => m.group == group);
	return {
		group,
		groupSettings
	};
};
