const testBaseURL = 'http://localhost:8080';

async function main() {
	let res = await fetch(
		`${testBaseURL}/download/audio?url=https://www.youtube.com/watch?v=pJ33e4xD3w4`
	);

	if (!res.ok || !res.body) {
		console.error('Error occured while getting download ID');
		return;
	}

	const resJSON = await res.json();

	console.log(resJSON);

	const downloadID = resJSON['download_id'];
	if (!downloadID) {
		console.error('DownloadID is null');
		return;
	}

	console.log('DownloadID: ' + downloadID);

	res = await fetch(`${testBaseURL}/stream/${downloadID}`);
	if (!res.ok || !res.body) {
		console.error('Error occured while getting download log');
		if (res.body) {
			console.log('Detail: ' + (await res.text()));
		}
		return;
	}

	const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();

	console.log('=====[LOG]=====');
	while (true) {
		const { value, done } = await reader.read();

		if (done) {
			console.log('=====[DONE]=====');
			break;
		}

		if (value) {
			console.log(value);
		}
	}
}

main();
