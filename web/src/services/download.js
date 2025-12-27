import { useFFmpeg } from "../store/useFfmpeg";

const downloadWithProgress = async (url, setProgress) => {
  const response = await fetch(url);
  const reader = response.body.getReader();
  const contentLength = +response.headers.get('Content-Length');

  let receivedLength = 0;
  let chunks = []; 
  
  while(true) {
    const {done, value} = await reader.read();
    if (done) break;

    chunks.push(value);
    receivedLength += value.length;

    // Hitung persentase download
    const step = Math.round((receivedLength / contentLength) * 100);
    setProgress(step);
  }

  const chunksAll = new Uint8Array(receivedLength);
  let position = 0;
  for(let chunk of chunks) {
    chunksAll.set(chunk, position);
    position += chunk.length;
  }

  return chunksAll; // Ini bisa langsung masuk ke ffmpeg.writeFile()
};


export const runDownloadTask = async (url, updateProgress) => {
  const { ffmpeg } = useFFmpeg()

  const chunks = downloadWithProgress(url, (newProgress) => updateProgress(newProgress))

  ff
}
