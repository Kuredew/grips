import { streamVideoUrl } from './api/streamVideoUrl';
import { downloadFileWithProgress } from './core/downloadFile';
import { settingsManager } from './settings.svelte';
import type { MediaType, Quality } from './types';
import type { DoneEventData, ErrorEventData, MediaInfo, ProgressEventData } from './types/api';
import {
	createExtractingQueueItem,
	toDownloading,
	toFailed,
	toFinished,
	type QueueItem
} from './types/queue';
import { downloadBlob } from './util/downloadBlob';

export const mockQueueItems: QueueItem[] = [
	{
		id: '231',
		title: 'Mac Mini M6 Ternyata Sekencang Ini?! Mac Mini M6 Ternyata Sekencang Ini?!',
		url: '',
		log: ['Extracting content...'],
		state: 'extracting',
		mediaType: 'auto'
	},
	{
		id: '2314',
		title: 'いえない / ひらぎ （cover）',
		url: '',
		progress: 50,
		state: 'downloading',
		mediaType: 'audio',
		downloadableUrl: ''
	},
	{
		id: '2312',
		title: 'いえない / ひらぎ （cover',
		url: '',
		blob: new Blob(),
		state: 'finished',
		mediaType: 'audio'
	},
	{
		id: '2313',
		title: 'いえない / ひらぎ （cover',
		url: '',
		state: 'failed',
		errorDetail: 'queue failed: Error: EventSource stream connection error: [object Event]',
		mediaType: 'audio'
	}
];

class QueueManager {
	#queueItems: QueueItem[] = $state([]);

	get queueItems() {
		return this.#queueItems;
	}

	findQueueItem(id: string) {
		return this.#queueItems.find((m) => m.id == id);
	}

	addQueueItem(title: string, url: string, mediaType: MediaType) {
		const id = crypto.randomUUID();

		this.#queueItems.push(createExtractingQueueItem(id, title, url, mediaType));
		return this.findQueueItem(id);
	}

	#updateItemInArray(item: QueueItem) {
		const index = this.#queueItems.findIndex((m) => m.id == item.id);
		if (index != -1) {
			this.#queueItems[index] = item;
		}
	}

	createQueueJob(mediaInfo: MediaInfo, url: string, mediaType: 'video' | 'audio') {
		const queueItem = this.addQueueItem(mediaInfo.title, url, mediaType);
		if (!queueItem) throw new Error('Queue is not created succesfully.');

		return {
			start: async () => {
				const settings = settingsManager.settingsValue.current;
				const quality = settings['video_quality'] as Quality;
				const recodeVideo = settings['recode_video'] as boolean;

				let doneEventData: null | DoneEventData = null;
				let errorEventData: null | ErrorEventData = null;

				try {
					await streamVideoUrl(url, mediaType, quality, recodeVideo, (streamEvent) => {
						const currentState = this.findQueueItem(queueItem.id);
						if (!currentState) return;

						let data;

						switch (streamEvent.event) {
							case 'error':
								data = streamEvent.data as ErrorEventData;
								errorEventData = data;
								break;
							case 'done':
								data = streamEvent.data as DoneEventData;
								doneEventData = data;
								break;
							case 'progress':
								data = streamEvent.data as ProgressEventData;
								if (currentState.state == 'extracting') {
									this.#updateItemInArray({
										...currentState,
										log: [...currentState.log, data.log]
									});
								}
						}
					});

					if (!doneEventData) {
						if (errorEventData) {
							const errorData = errorEventData as ErrorEventData;
							throw new Error(
								`Error occured while downloading media to server: ${errorData.message}`
							);
						}

						throw new Error('Error streamVideoUrl not return done event.');
					}
					const doneData = doneEventData as DoneEventData;

					const currentItem = this.findQueueItem(queueItem.id);
					if (currentItem && currentItem.state == 'extracting') {
						this.#updateItemInArray(toDownloading(currentItem, 0, doneData.file_url));
					}
					const blob = await downloadFileWithProgress(doneData.file_url, (progress) => {
						const itemNow = this.findQueueItem(queueItem.id);
						if (itemNow && itemNow.state == 'downloading') {
							this.#updateItemInArray({
								...itemNow,
								progress
							});
						}
					});

					const file_ext = doneData.file_name.split('.').pop();
					const fileName = `${mediaInfo.title}.${file_ext}`;

					const itemNow = this.findQueueItem(queueItem.id);
					if (itemNow) {
						this.#updateItemInArray({
							...itemNow,
							title: fileName
						});
					}

					downloadBlob(blob, fileName);

					const itemBeforeFinish = this.findQueueItem(queueItem.id);
					if (itemBeforeFinish && itemBeforeFinish.state == 'downloading') {
						this.#updateItemInArray(toFinished(itemBeforeFinish, blob));
					}
				} catch (e) {
					const currentItem = this.findQueueItem(queueItem.id);
					if (
						currentItem &&
						(currentItem.state == 'extracting' || currentItem.state == 'downloading')
					) {
						this.#updateItemInArray(toFailed(currentItem, `queue failed: ${e}`));
					}

					console.error(`Theres an error in queue with id ${currentItem?.id}!`);
					console.error(e);
				}
			}
		};
	}
}

export const queueManager = new QueueManager();
