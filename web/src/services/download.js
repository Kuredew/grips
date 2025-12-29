import { extractUrlInfo } from "./apiService";

export const fetchFile = async (fileUrl, onProgress = () => {}) => {
  console.log(`[${fetchFile.name}] fetching ${fileUrl}...`)
  const progressObj = {
    log: "",
    progress: 0
  }

  let chunksAll
  try {
    const response = await fetch(fileUrl);
    const reader = response.body.getReader();
    const contentLength = +response.headers.get('Content-Length');

    let receivedLength = 0;
    let chunks = []; 
    
    while(true) {
      const {done, value} = await reader.read();
      if (done) break;

      chunks.push(value);
      receivedLength += value.length;

      const step = Math.round((receivedLength / contentLength) * 100);
      onProgress({
        ...progressObj,
        progress: step,
        log: `downloading (${step})`
      })
    }

    chunksAll = new Uint8Array(receivedLength);
    let position = 0;
    for(let chunk of chunks) {
      chunksAll.set(chunk, position);
      position += chunk.length;
    }
  } catch (e) {
    console.warn(`[${fetchFile.name}] error fetching ${fileUrl}: ${e}`)
    throw e
  }

  onProgress({ ...progressObj, log: 'fetch completed.' })
  console.log(`[${fetchFile.name}] fetch completed.`)
  return chunksAll;
}


export const runDownloadTask = async (options, onProgress = () => {}) => {
  const progressObj = {
    log: "",
    progress: 0
  }

  onProgress({ ...progressObj, log: "getting ready..." })

  try {
    console.log(`[${runDownloadTask.name}] requesting extract to api`)

    const infoObj = await extractUrlInfo(options, (response) => {
      onProgress({ ...progressObj, log: response.log })
    })

    console.log(`[${runDownloadTask.name}] got url info: ${JSON.stringify(infoObj, {}, 2)}`)
  } catch (e) {
    console.warn(`[${runDownloadTask.name}] error getting url info: ${e}`)
    onProgress({ ...progressObj, log: `${e}` })
    throw e
  }

}