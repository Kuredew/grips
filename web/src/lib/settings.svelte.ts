import { PersistentState } from '@friendofsvelte/state';
import { settingsSchema, type AppSettingsData } from './settingsSchema';

class AppSettings {
	#data = new PersistentState<AppSettingsData>('app-settings-data', {
		mediaQuality: 'best'
	});

	readonly schema = settingsSchema;

	get data() {
		return this.#data.current;
	}
}

export const settings = new AppSettings();
