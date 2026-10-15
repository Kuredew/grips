import { getAllChangelog } from '#lib/changelog.ts';
import type { RequestHandler } from '@sveltejs/kit';
import { response } from 'super-sitemap/sveltekit';

export const GET: RequestHandler = async ({ url }) => {
	return await response({
		origin: url.origin,

		paramValues: {
			'/changelogs/[version_id]': (await getAllChangelog()).map((m) => m.version)
		},
		excludeRoutePatterns: [/^\/settings\/\[group_key\]$/]
	});
};
