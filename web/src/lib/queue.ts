import type { MediaType, Queue } from './types/types';

class QueueManager {
	#items = $state<Queue[]>([]);

	get items() {
		return this.#items;
	}

	add(url: string, mediaType: MediaType) {}
}
