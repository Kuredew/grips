import { settingsSchema } from '#lib/settingsSchema.js';

export const load = ({ params }) => {
	const groupKey = params.group_key;
	const settings = settingsSchema.filter((m) => m.groupKey == groupKey);

	return {
		settings
	};
};
