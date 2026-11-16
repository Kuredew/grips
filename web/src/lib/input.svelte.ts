import { PersistentState } from '@friendofsvelte/state';
import type { MediaType } from './types';

class InputManager {
	#inputValue = new PersistentState<string>('input_value', '');
	#mediaType = new PersistentState<MediaType>('media_type', 'auto');
	loading = $state(false);
	isOffline = $state(false);
	isServerChecked = $state(false);
	isOfflineDialogOpened = $state(false);
	queueListOpened = $state(false);

	get inputValue() {
		return this.#inputValue;
	}

	get mediaType() {
		return this.#mediaType;
	}
}

export const inputManager = new InputManager();
