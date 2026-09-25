import { getVideoInfo } from './api/getVideoInfo';
import { downloadFileWithProgress } from './core/downloadFile';
import { downloadMedia } from './core/downloadMedia';
import type { MediaType, Queue } from './types/types';
import { downloadBlob } from './util/downloadBlob';

class QueueManager {
	#items = $state<Queue[]>([
		// {
		// 	id: '0',
		// 	title: 'Some Video',
		// 	fileName: 'test.mp4',
		// 	mediaType: 'video',
		// 	mediaUrl: null,
		// 	mediaBlob: new Blob(),
		// 	status: 'completed',
		// 	percent: 50,
		// 	log: [],
		// 	file_url: null
		// }
	]);

	get items() {
		return this.#items;
	}

	getItem(id: string) {
		return this.#items.find((m) => m.id === id);
	}

	async startQueue(url: string, mediaType: MediaType) {
		const queue = this.add();
		if (!queue) throw new Error('Queue not created!');

		queue.mediaUrl = url;
		queue.mediaType = mediaType;

		try {
			queue.status = 'fetching';
			const videoInfo = await getVideoInfo(url);

			queue.title = videoInfo.title;

			queue.status = 'processing';
			const file_url = await downloadMedia(url, mediaType, (msg) => {
				queue.log.push(msg);
			});

			queue.file_url = file_url;
			queue.status = 'downloading';

			const blob = await downloadFileWithProgress(file_url, (percent) => {
				queue.percent = percent;
			});
			queue.mediaBlob = blob;
			const fileName = `${videoInfo.title}.${mediaType == 'video' ? 'mp4' : 'mp3'}`;
			queue.fileName = fileName;

			downloadBlob(blob, fileName);

			queue.status = 'completed';
		} catch (e) {
			queue.status = 'failed';
			queue.log.push(String(e));
			console.error(e);
		}
	}

	add() {
		const id = crypto.randomUUID();
		this.#items.push({
			id,
			title: null,
			fileName: null,
			mediaType: null,
			mediaUrl: null,
			mediaBlob: null,
			status: 'fetching',
			percent: 0,
			log: [],
			file_url: null
		});

		return this.getItem(id);
	}
}

export const queueManager = new QueueManager();
