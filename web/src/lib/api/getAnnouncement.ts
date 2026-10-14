import type { Announcement } from '#lib/types/announcement.ts';
import { ANNOUNCEMENT_TSV_URL } from '$app/env/public';

export const getAnnouncement = async (): Promise<Announcement[]> => {
	const res = await fetch(ANNOUNCEMENT_TSV_URL, { cache: 'no-store' });
	if (!res.ok) throw new Error('Response not ok');

	const text = await res.text();
	const lines = text.split('\n');
	const contents = lines.slice(1);

	const announcements: Announcement[] = [];
	for (const content of contents) {
		const splitTab = content.split('\t');
		const type = splitTab[0];
		const text = splitTab[1];
		const link = splitTab[2];
		const activeUntil = new Date(splitTab[3]);

		announcements.push({
			type,
			text,
			link,
			activeUntil
		});
	}

	return announcements;
};
