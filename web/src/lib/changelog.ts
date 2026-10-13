import { marked } from 'marked';
import semver from 'semver';

export interface Changelog {
	content: string;
	content_raw: string;
	metadata: {
		title: string;
		date: string;
		image: string;
		image_desc: string;
	};
}

export interface ChangelogItem {
	version: string;
	changelog: Changelog;
}

const parseChanglogMarkdown = async (fileContent: string): Promise<Changelog> => {
	const frontmatterRegex = /^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/;
	const match = fileContent.match(frontmatterRegex);

	let title = '';
	let date = '';
	let image = '';
	let image_desc = '';
	let markdownBody = fileContent;

	if (match) {
		const frontmatterString = match[1];
		markdownBody = match[2];

		const titleMatch = frontmatterString.match(/title:\s*["'](.+?)["']/);
		const dateMatch = frontmatterString.match(/date:\s*["'](.+?)["']/);
		const imageMatch = frontmatterString.match(/image:\s*["'](.+?)["']/);
		const imageDescMatch = frontmatterString.match(/image_desc:\s*["'](.+?)["']/);
		if (titleMatch && dateMatch && imageMatch && imageDescMatch) {
			title = titleMatch[1];
			date = dateMatch[1];
			image = imageMatch[1];
			image_desc = imageDescMatch[1];
		}
	}

	const content = await marked.parse(markdownBody);

	return {
		content,
		content_raw: markdownBody,
		metadata: {
			title,
			date,
			image,
			image_desc
		}
	};
};

export const getAllChangelog = async () => {
	const markdownFiles = import.meta.glob('/src/changelogs/*.md', {
		eager: true,
		query: '?raw',
		import: 'default'
	});

	const changelogs: ChangelogItem[] = [];

	for (const path in markdownFiles) {
		const slug = path.split('/').pop()?.replace('.md', '') || '';

		const fileContent = markdownFiles[path];
		const changelogItem = await parseChanglogMarkdown(fileContent);
		changelogs.push({
			version: slug,
			changelog: { ...changelogItem }
		});
	}

	const sorted = changelogs.sort((a, b) => {
		if (a.version.includes('legacy') && !b.version.includes('legacy')) return 1;
		if (!a.version.includes('legacy') && b.version.includes('legacy')) return -1;

		return semver.compare(b.version, a.version);
	});

	return sorted;
};

export const getChangelog = async (version: string) => {
	const changelogs = await getAllChangelog();

	const filter = changelogs.filter((m) => {
		return m.version == version;
	});

	return filter.pop();
};

// export const getChangelog = (version: string) => {
//     const changelogs = getAllChangelog();
//
//     return changelogs.filter((m) => m.version == version).pop() || null;
// };
//
// export const getAllChangelog = () => {
//     const mdFiles = import.meta.glob<Changelog>('/src/changelogs/*.md', {
//         eager: true
//     });
//     const changelogItems: ChangelogItem[] = [];
//
//     for (const path in mdFiles) {
//         const changelog = mdFiles[path];
//         const version = path.split('/').pop()?.replace('.md', '') || '';
//         changelogItems.push({
//             version,
//             changelog
//         });
//     }
//
//     const filterAndSorted = changelogItems
//         .filter((m) => m.version.includes('legacy'))
//         .toSorted((a, b) => parseInt(a.version) - parseInt(b.version));
//
//     filterAndSorted.push(
//         ...changelogItems
//             .filter((m) => !m.version.includes('legacy'))
//             .toSorted((a, b) => parseInt(a.version) - parseInt(b.version))
//     );
//
//     return filterAndSorted;
// };
