import { PersistentState } from '@friendofsvelte/state';
import type { settingKeyType } from './settingsSchema';

class SettingsManager {
	#settingsValue = new PersistentState<Record<settingKeyType, string | boolean>>(
		'settings_data',
		{}
	);

	defaultValue: Record<settingKeyType, string | boolean> = {
		dark_mode: true,
		video_quality: '1080p',
		recode_video: false,
		video_codec: 'h264',
		border_radius: 'rounded'
	};

	constructor() {
		Object.keys(this.defaultValue).forEach((key) => {
			const value = this.#settingsValue.current[key];
			if (value !== undefined) return;

			this.#settingsValue.current[key] = this.defaultValue[key];
		});
	}

	get settingsValue() {
		return this.#settingsValue;
	}
}

export const settingsManager = new SettingsManager();
