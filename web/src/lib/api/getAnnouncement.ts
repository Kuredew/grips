import type { Announcement } from '#lib/types/announcement.ts';
import { ANNOUNCEMENT_TSV_URL } from '$app/env/public';

export const getAnnouncement = async (): Promise<Announcement> => {
	const res = await fetch(ANNOUNCEMENT_TSV_URL, { cache: 'no-store' });
	if (!res.ok) throw new Error('Response not ok');

	const text = await res.text();
	const lines = text.split('\n');
	const contents = lines.slice(1);

	const firstContent = contents.pop();
	const firstContentSplitTab = firstContent?.split('\t');

	console.log('text: ' + firstContentSplitTab);
	if (firstContentSplitTab)
		return {
			type: firstContentSplitTab[0],
			text: firstContentSplitTab[1],
			link: firstContentSplitTab[2],
			active: firstContentSplitTab[3] == 'TRUE'
		};

	throw new Error('First content is undefined');
};
