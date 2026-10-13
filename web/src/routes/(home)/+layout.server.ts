import { getAnnouncement } from '#lib/api/getAnnouncement.ts';

export const load = async () => {
	const announcement = await getAnnouncement();

	return {
		announcement
	};
};
