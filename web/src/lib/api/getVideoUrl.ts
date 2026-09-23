import { PUBLIC_API_BASE_URL } from '$env/static/public';
import type { StreamEvent } from '$lib/types/types';

export const getVideoUrl = async (
	url: string,
	mediaType: 'video' | 'audio',
	output: (streamEvent: StreamEvent) => void
) => {
	try {
		let res = await fetch(`${PUBLIC_API_BASE_URL}/download/${mediaType}?url=${url}`);

		if (!res.ok || !res.body) {
			throw new Error('Error occured while getting download ID');
		}

		const resJSON = await res.json();

		const downloadID = resJSON['download_id'];
		if (!downloadID) {
			throw new Error('DownloadID is null');
		}

		res = await fetch(`${PUBLIC_API_BASE_URL}/stream/${downloadID}`);
		if (!res.ok || !res.body) {
			throw new Error('Error occured while getting download log');
		}

		const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();

		while (true) {
			const { value, done } = await reader.read();

			if (done) {
				break;
			}

			if (value) {
				const trimmedValue = value.trim();
				const lines = trimmedValue.split('\n');

				lines.forEach((line) => {
					if (!line) return;

					const jsonString = line.slice(5);

					const parsedData = JSON.parse(jsonString) as StreamEvent;
					output(parsedData);
				});
			}
		}
	} catch (e) {
		throw new Error('getVideoUrl: ' + e, { cause: e });
	}
};
