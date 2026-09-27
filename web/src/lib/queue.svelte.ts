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

	async startQueue(title: string, url: string, mediaType: MediaType) {
		const queue = this.add();
		if (!queue) throw new Error('Queue not created!');

		queue.title = title;
		queue.mediaUrl = url;
		queue.mediaType = mediaType;

		try {
			queue.status = 'processing';
			const doneData = await downloadMedia(url, mediaType, (msg) => {
				queue.log.push(msg);
			});
			if (!doneData) {
				throw new Error(
					'an issue occurred while assigning the server to download media: the server did not send a done data at all'
				);
			}

			queue.file_url = doneData.file_url;
			queue.status = 'downloading';

			const blob = await downloadFileWithProgress(doneData.file_url, (percent) => {
				queue.percent = percent;
			});
			queue.mediaBlob = blob;
			const fileName = title + '.' + doneData.file_ext;
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
