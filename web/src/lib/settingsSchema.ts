import type { AppSetting } from './types/types';

export const settingsSchema = [
	{
		key: 'mediaQuality',
		label: 'quality',
		description:
			"select the video quality you want to download, we'll look for the one that most closely matches your choice.",
		group: 'media',
		type: 'select' as const,
		options: [
			{ label: 'best', value: 'best' },
			{ label: 'worst', value: 'worst' },
			{ label: '1080p', value: '1080p' },
			{ label: '720p', value: '720p' },
			{ label: '480p', value: '480p' },
			{ label: '360p', value: '360p' }
		]
	},
	{
		key: 'recodeVideo',
		label: 'recode video',
		description:
			'encode the downloaded video to h264, but it will take longer because the server needs time to re-encode the media.',
		group: 'media',
		type: 'checkbox'
	}
] as const satisfies readonly AppSetting[];

export type SettingKey = (typeof settingsSchema)[number]['key'];
export type AppSettingsData = Record<string, string>;
