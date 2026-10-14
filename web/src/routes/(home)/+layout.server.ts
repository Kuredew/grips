import { getAnnouncement } from '#lib/api/getAnnouncement.ts';

export const load = async () => {
	const announcements = await getAnnouncement();

	return {
		announcements
	};
};
