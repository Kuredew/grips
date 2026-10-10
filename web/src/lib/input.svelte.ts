import { PersistentState } from '@friendofsvelte/state';
import type { MediaType } from './types';

class InputManager {
	#inputValue = new PersistentState<string>('input_value', '');
	#mediaType = new PersistentState<MediaType>('media_type', 'auto');

	get inputValue() {
		return this.#inputValue;
	}

	get mediaType() {
		return this.#mediaType;
	}
}

export const inputManager = new InputManager();
