import { downloadMedia } from './core/downloadMedia';
import type { MediaType, Queue } from './types/types';

class QueueManager {
	#items = $state<Queue[]>([]);

	get items() {
		return this.#items;
	}

	async startQueue(url: string, mediaType: MediaType) {
		const queue = this.add();
		if (!queue) throw new Error('Queue not created!');

		try {
			const file_url = await downloadMedia(url, mediaType, (msg) => {
				queue.log.push(msg);
			});

			queue.file_url = file_url;
		} catch (e) {
			queue.status = 'failed';
			queue.log.push(String(e));
		}
	}

	add() {
		const id = crypto.randomUUID();
		this.#items.push({ id, status: 'processing', percent: 0, log: [], file_url: null });

		return this.#items.find((m) => m.id === id);
	}
}

export const queueManager = new QueueManager();
