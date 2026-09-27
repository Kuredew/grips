import { browser } from '$app/environment';
import { readable } from 'svelte/store';
import type { VersionResponse } from './types/types';

export const version = readable<VersionResponse | undefined>(undefined, (set) => {
	if (!browser) return;

	fetch('/version.json')
		.then((r) => r.json())
		.then(set);
});
