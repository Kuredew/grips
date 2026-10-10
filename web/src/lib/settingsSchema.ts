export interface SelectOption {
	key: string;
	label: string;
	value: string;
}

export type SettingType = 'select' | 'toggle';

export interface SettingItem {
	key: string;
	label: string;
	type: SettingType;
	groupKey: string;
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
			{ label: 'worst', key: 'worst', value: 'worst' },
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
		type: 'toggle',
		description: 'Enable re-encode the downloaded video.'
	},
	{
		key: 'video_codec',
		label: 'Video codec',
		groupKey: 'video',
		type: 'select',
		description: 'Enable re-encode the downloaded video.',
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

export const settingsSchema = [...VideoSettingItems];
export type settingKeyType = (typeof settingsSchema)[number]['key'];
