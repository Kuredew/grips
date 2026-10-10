import { PersistentState } from '@friendofsvelte/state';
import type { settingKeyType } from './settingsSchema';

class SettingsManager {
	#settingsValue = new PersistentState<Record<settingKeyType, string | boolean>>('settings_data', {
		dark_mode: true,
		video_quality: 'best',
		recode_video: true,
		video_codec: 'h264'
	});

	get settingsValue() {
		return this.#settingsValue;
	}
}

export const settingsManager = new SettingsManager();
