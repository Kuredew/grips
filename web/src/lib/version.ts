import { browser } from '$app/environment';
import { readable } from 'svelte/store';

interface VersionResponse {
	commit: string;
	version: string;
}

export const version = readable<VersionResponse | undefined>(undefined, (set) => {
	if (!browser) return;

	fetch('/version.json')
		.then((r) => r.json())
		.then(set);
});
