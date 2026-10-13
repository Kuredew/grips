import { settingsSchema } from '#lib/settingsSchema.js';

export const load = ({ params }) => {
	const groupKey = params.group_key;
	const settings = settingsSchema.filter((m) => m.groupKey == groupKey);

	return {
		title: 'Settings' + ` - ` + groupKey.charAt(0).toUpperCase() + groupKey.slice(1),
		description:
			'Customize your preferences, configure the media codecs, and set the quality you want',
		canonicalUrl: '/settings/' + groupKey,
		settings
	};
};
