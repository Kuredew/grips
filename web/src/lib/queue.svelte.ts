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

	setItem(queue: Queue, editValue: Partial<Queue>) {
		Object.assign(queue, editValue);
	}

	async startQueue(title: string, url: string, mediaType: MediaType) {
		const queue = this.add();
		if (!queue) throw new Error('Queue not created!');

		this.setItem(queue, { title, mediaUrl: url, mediaType, status: 'processing' });

		try {
			const doneData = await downloadMedia(url, mediaType, (msg) => {
				this.setItem(queue, { log: [...queue.log, msg] });
			});
			if (!doneData) {
				throw new Error(
					'an issue occurred while assigning the server to download media: the server did not send a done data at all'
				);
			}

			this.setItem(queue, { file_url: doneData.file_url, status: 'downloading' });

			const blob = await downloadFileWithProgress(doneData.file_url, (percent) => {
				queue.percent = percent;
			});
			const fileName = title + '.' + doneData.file_ext;

			downloadBlob(blob, fileName);

			this.setItem(queue, { mediaBlob: blob, fileName: fileName, status: 'completed' });
		} catch (e) {
			this.setItem(queue, { status: 'failed', log: [...queue.log, String(e)] });
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
