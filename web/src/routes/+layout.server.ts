import type { VersionResponse } from '$lib/types/types';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch }) => {
	let versionData: VersionResponse;
	try {
		const response = await fetch('/version.json');
		versionData = (await response.json()) as VersionResponse;
	} catch {
		versionData = {
			version: 'grips',
			commit: 'web'
		};
	}

	return {
		version: versionData
	};
};
