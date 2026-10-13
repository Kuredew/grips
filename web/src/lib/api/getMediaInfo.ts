import type { MediaInfo } from '#lib/types/api.ts';
import { API_BASE_URL } from '$app/env/public';

export const getMediaInfo = async (url: string) => {
	const res = await fetch(`${API_BASE_URL}/info?url=${url}`);
	if (!res.ok) {
		throw new Error(await res.text());
	}

	return (await res.json()) as MediaInfo;
};
