import { PersistentState } from '@friendofsvelte/state';
import type { MediaType } from './types/types';

class InputManager {
	inputValue = $state('');
	ready = $state(false);
	#mediaType = new PersistentState<MediaType>('mediaType', 'auto');

	get mediaType() {
		return this.#mediaType;
	}
}

export const inputManager = new InputManager();
