export interface SelectOption {
	key: string;
	label: string;
	value: string;
}

export interface SubGroupItem {
	key: string;
	label: string;
	groupKey: string;
}

export type SettingType = 'select' | 'toggle';

export interface SettingItem {
	key: string;
	label: string;
	type: SettingType;
	groupKey: string;
	subGroupKey?: string;
	description: string;
	requiredSettingItem?: {
		key: string;
		value: string | boolean;
	};
	selectOptions?: SelectOption[];
}

const VideoSettingItems: SettingItem[] = [
	{
		key: 'video_quality',
		label: 'Video quality',
		groupKey: 'video',
		type: 'select',
		description: "We'll look for the one that most closely matches your choice.",
		selectOptions: [
			{ label: 'Best', key: 'best', value: 'best' },
			{ label: 'Worst', key: 'worst', value: 'worst' },
			{ label: '1080p', key: '1080p', value: '1080p' },
			{ label: '720p', key: '720p', value: '720p' },
			{ label: '480p', key: '480p', value: '480p' },
			{ label: '360p', key: '360p', value: '360p' }
		]
	},
	{
		key: 'recode_video',
		label: 'Recode video',
		groupKey: 'video',
		subGroupKey: 'video_processing',
		type: 'toggle',
		description: 'Enable re-encode the downloaded video.'
	},
	{
		key: 'video_codec',
		label: 'Video codec',
		groupKey: 'video',
		subGroupKey: 'video_processing',
		type: 'select',
		description:
			'Select video codec, required "Recode Video" setting to be enabled. (Recommended to select H264 for maximum compatibility)',
		requiredSettingItem: {
			key: 'recode_video',
			value: true
		},
		selectOptions: [
			{
				label: 'H264',
				key: 'h264',
				value: 'h264'
			},
			{
				label: 'H265',
				key: 'h265',
				value: 'h265'
			},
			{
				label: 'VP9',
				key: 'vp9',
				value: 'vp9'
			},
			{
				label: 'AV1',
				key: 'av1',
				value: 'av1'
			}
		]
	}
];

const appearanceSettings: SettingItem[] = [
	{
		key: 'dark_mode',
		label: 'Dark Mode',
		description: 'Toggle dark mode.',
		type: 'toggle',
		groupKey: 'appearance',
		subGroupKey: 'theme'
	}
];

export const subGroupSchema: SubGroupItem[] = [
	{
		key: 'theme',
		label: 'Theme',
		groupKey: 'appearance'
	},
	{
		key: 'video_processing',
		label: 'Video Processing',
		groupKey: 'video'
	}
];

export const settingsSchema = [...appearanceSettings, ...VideoSettingItems];
export type settingKeyType = (typeof settingsSchema)[number]['key'];
