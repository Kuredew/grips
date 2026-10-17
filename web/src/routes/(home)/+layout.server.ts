import { getAnnouncement } from '#lib/api/getAnnouncement.ts';

export const load = async () => {
	try {
		const announcements = await getAnnouncement();

		return {
			announcements
		};
	} catch {
		return {};
	}
};
