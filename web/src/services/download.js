import z from "zod";
import { extractUrlInfo } from "./apiService";
import { sleep } from "../utils/sleep";
const API_URL = import.meta.env.VITE_API_URL

const playlistDataListSchema = z.array(
  z.object({
    title: z.string(),
    fileDataList: z.array(
      z.instanceof(Uint8Array)
    )
  })
)

export const fetchFile = async (fileUrl, onProgress = () => {}) => {
  let chunksAll
  try {
    const requestUrl = `${API_URL}/proxy?url=${encodeURIComponent(fileUrl)}`
    console.log(`[${fetchFile.name}] fetching ${requestUrl}...`)

    const response = await fetch(requestUrl);
    const reader = response.body.getReader();
    const contentLength = +response.headers.get('Content-Length');
    console.log(`[${fetchFile.name}] content length is ${contentLength}`)

    let receivedLength = 0;
    let chunks = []; 
    
    while(true) {
      const {done, value} = await reader.read();
      if (done) break;

      chunks.push(value);
      receivedLength += value.length;

      const step = Math.round((receivedLength / contentLength) * 100);
      console.log(`[${fetchFile.name}] progress: ${step}%`)
      onProgress({
        progress: step,
        log: `downloading (${step}%)`
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

  onProgress({ log: 'fetch completed.' })
  console.log(`[${fetchFile.name}] fetch completed.`)
  return chunksAll;
}


export const runDownloadTask = async (options, onProgress = () => {}) => {
  const progressObj = {
    title: "",
    log: "",
    progress: 0
  }

  onProgress({ log: "getting ready..." })

  try {
    console.log(`[${runDownloadTask.name}] requesting extract to api`)

    const responseObj = await extractUrlInfo(options, (response) => {
      onProgress({ log: response.log })
    })

    console.log(`[${runDownloadTask.name}] got url info: ${JSON.stringify(responseObj, {}, 2)}`)

    const urlInfoList = responseObj.info
    const playlistDataList = []

    for (const urlInfo of urlInfoList) {
      const urls = urlInfo.url.split(" | ")
      const fileDataList = []

      onProgress({ title: urlInfo.title, log: "cooldown 5 sec before download..."})
      await sleep(5000)

      for (const url of urls) {
        const fileData = await fetchFile(url, onProgress)
        fileDataList.push(fileData)
      }

      const newFile = {
        title: urlInfo.title,
        fileDataList: fileDataList
      }
      playlistDataList.push(newFile)
    }

    console.log(playlistDataList)
    return playlistDataListSchema.parse(playlistDataList)
  } catch (e) {
    console.warn(`[${runDownloadTask.name}] error getting url info: ${e}`)
    onProgress({ ...progressObj, log: `${e}` })
    throw e
  }

}