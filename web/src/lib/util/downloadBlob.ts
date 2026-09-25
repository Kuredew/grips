import { browser } from '$app/environment';

export function downloadBlob(blob: Blob, fileName: string) {
	if (browser) {
		// Create url object
		const blobUrl = window.URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = blobUrl;

		link.download = fileName;

		// Insert blob to DOM
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);

		// // Release memory
		// window.URL.revokeObjectURL(blobUrl);
	}
}
