import type { Quality } from '#lib/types.ts';
import type { StreamEvent } from '#lib/types/api.ts';
import { API_BASE_URL } from '$app/env/public';

export const streamVideoUrl = async (
	url: string,
	mediaType: 'video' | 'audio',
	quality: Quality,
	playlistItems: number[],
	recodeVideo: boolean,
	output: (streamEvent: StreamEvent) => void
): Promise<void> => {
	try {
		const params = new URLSearchParams();
		params.append('url', url);
		params.append('quality', quality);
		params.append('recodeVideo', recodeVideo ? 'true' : 'false');

		let playlistItemsString = '';
		playlistItems.forEach((m) => {
			playlistItemsString += `,${m}`;
		});
		params.append('playlistItems', `${playlistItemsString.slice(1)}`);

		const res = await fetch(`${API_BASE_URL}/download/${mediaType}?${params.toString()}`);

		if (!res.ok) {
			throw new Error(`Response is not ok: ${res.status}`);
		}

		const resJSON = await res.json();

		const downloadID = resJSON['download_id'];
		if (!downloadID) {
			throw new Error('Failed to get download ID: download ID is not found in response json');
		}

		return new Promise((resolve, reject) => {
			try {
				const eventSource = new EventSource(`${API_BASE_URL}/stream/${downloadID}`);

				eventSource.onmessage = (event) => {
					try {
						const parsedData = JSON.parse(event.data) as StreamEvent;
						output(parsedData);

						if (parsedData.event == 'done') {
							resolve();
							eventSource.close();
						}
					} catch (e) {
						throw new Error('Failed to parse sse event data: ' + e, { cause: e });
					}
				};

				eventSource.onerror = (event) => {
					console.error('Theres a problem in EventSource:', event);

					if (eventSource.readyState === EventSource.CONNECTING) {
						console.warn('Connection closed. Trying again...');
					} else if (eventSource.readyState === EventSource.CLOSED) {
						reject(new Error('streamVideoUrl<eventsource>: Connection closed.'));
					}
				};
			} catch (e) {
				reject(new Error(`streamVideoUrl<promise>: ${e}`));
			}
		});
	} catch (e) {
		throw new Error('streamVideoUrl: ' + e, { cause: e });
	}
};
