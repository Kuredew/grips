export async function downloadFileWithProgress(
	url: string,
	onProgress?: (percentage: number) => void
): Promise<Blob> {
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Gagal mendownload file: ${response.statusText}`);
	}

	const contentLength = response.headers.get('content-length');
	const totalBytes = contentLength ? parseInt(contentLength, 10) : 0;

	const reader = response.body?.getReader();
	if (!reader) {
		throw new Error('ReadableStream tidak didukung atau tidak tersedia.');
	}

	let receivedBytes = 0;
	const chunks: Uint8Array[] = [];

	while (true) {
		const { done, value } = await reader.read();

		if (done) {
			break;
		}

		chunks.push(value);
		receivedBytes += value.length;

		if (totalBytes > 0 && onProgress) {
			const percentage = Math.round((receivedBytes / totalBytes) * 100);
			onProgress(percentage);
		}
	}

	const blob = new Blob(chunks as unknown as BlobPart[]);

	return blob;
}
