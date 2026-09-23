import { PUBLIC_API_BASE_URL } from '$env/static/public';
import type { VideoInfo } from '$lib/types/types';

export const getVideoInfo = async (url: string) => {
	const res = await fetch(`${PUBLIC_API_BASE_URL}/info?url=${url}`);
	if (!res.ok) {
		throw new Error(await res.text());
	}

	return (await res.json()) as VideoInfo;
};
