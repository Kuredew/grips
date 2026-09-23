import { getVideoUrl } from '$lib/api/getVideoUrl';
import type { DoneEventData, ErrorEventData, EventData, ProgressEventData } from '$lib/types/types';

export const downloadMedia = async (url: string, outputLogFunc: (msg: string) => void) => {
	try {
		let file_url = '';

		await getVideoUrl(url, (output) => {
			let data: EventData | null = null;

			switch (output.event) {
				case 'error':
					data = output.data as ErrorEventData;
					throw new Error(data.message);
				case 'done':
					data = output.data as DoneEventData;
					file_url = data.file_url;
				case 'progress':
					data = output.data as ProgressEventData;
					outputLogFunc(data.log);
			}
		});

		return file_url;
	} catch (e) {
		throw new Error('downloadMedia: ' + e);
	}
};
