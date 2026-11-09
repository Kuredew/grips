import type { MediaType } from '#lib/types.ts';

interface BaseQueueItem {
	id: string;
	title: string;
	url: string;
	mediaType: MediaType;
}

export interface ExtractingQueue extends BaseQueueItem {
	state: 'extracting';
	log: string[];
}

export interface DownloadingQueue extends BaseQueueItem {
	state: 'downloading';
	progress: number;
	downloadableUrl: string;
}

export interface FinishedQueue extends BaseQueueItem {
	state: 'finished';
	blob: Blob;
}

export interface FailedQueue extends BaseQueueItem {
	state: 'failed';
	errorDetail: string;
	retry?: () => Promise<void>;
}

export type QueueItem = ExtractingQueue | DownloadingQueue | FinishedQueue | FailedQueue;

export function createExtractingQueueItem(
	id: string,
	title: string,
	url: string,
	mediaType: MediaType
): QueueItem {
	return {
		id,
		title,
		url,
		mediaType,
		state: 'extracting',
		log: ['']
	};
}

export function toDownloading(
	item: ExtractingQueue,
	progress: number,
	downloadableUrl: string
): DownloadingQueue {
	return {
		...item,
		state: 'downloading',
		progress,
		downloadableUrl
	};
}

export function toFinished(item: DownloadingQueue, blob: Blob): FinishedQueue {
	return {
		...item,
		state: 'finished',
		blob
	};
}

export function toFailed(
	item: DownloadingQueue | ExtractingQueue,
	errorDetail: string,
	retry?: () => Promise<void>
): FailedQueue {
	return {
		...item,
		state: 'failed',
		errorDetail,
		retry
	};
}
