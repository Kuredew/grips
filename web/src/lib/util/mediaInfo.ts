import type { MediaInfo } from '#lib/types/api.ts';

export function isVideo(mediaInfo: MediaInfo) {
	if (!mediaInfo.formats || !Array.isArray(mediaInfo.formats)) {
		return false;
	}

	return mediaInfo.formats.some((format) => {
		if (format.vcodec === 'none' && format.acodec === 'none') {
			return false;
		}

		if (format.vcodec && format.vcodec !== 'none') {
			return true;
		}

		return false;
	});
}
