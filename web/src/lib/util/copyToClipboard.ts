import { browser } from '$app/env';

export const copyToClipboard = (text: string) => {
	if (browser) {
		navigator.clipboard.writeText(text);
	}
};
