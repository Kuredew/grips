import { getVideoUrl } from '$lib/api/getVideoUrl';
import { settings } from '$lib/settings.svelte';
import type { DoneEventData, ErrorEventData, MediaType, ProgressEventData } from '$lib/types/types';

export const downloadMedia = async (
	url: string,
	mediaType: MediaType,
	outputLogFunc: (msg: string) => void
): Promise<null | DoneEventData> => {
	try {
		let doneEventData: null | DoneEventData = null;

		await getVideoUrl(url, mediaType, settings.data.mediaQuality, (output) => {
			let data;

			switch (output.event) {
				case 'error':
					data = output.data as ErrorEventData;
					throw new Error(data.message);
				case 'done':
					data = output.data as DoneEventData;
					doneEventData = data;
					break;
				case 'progress':
					data = output.data as ProgressEventData;
					outputLogFunc(data.log);
			}
		});

		return doneEventData;
	} catch (e) {
		throw new Error('downloadMedia: ' + e, { cause: e });
	}
};
