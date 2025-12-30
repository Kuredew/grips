import z from "zod";
import { extractUrlInfo } from "./apiService";
import { sleep } from "../utils/sleep";
const PROXY_URL = import.meta.env.VITE_PROXY_URL

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
  let lastChunks = []
  let receivedLength = 0
  let maxRetries = 10
  let currentRetries = 0

  const requestUrl = PROXY_URL + encodeURIComponent(fileUrl)
  console.log(`[${fetchFile.name}] fetching ${requestUrl}...`)

  while (true) {
    try {
      onProgress({ 
        log: `${fetchFile.name}: fetching file...`
      })

      let response = await fetch(requestUrl, { headers: {
        'Range': `bytes=${receivedLength}-`
      } });

      if (!response.ok) throw new Error(`[${fetchFile.name}] response is not OK`)
      if (!response.status === 206) {
        console.log(`[${fetchFile.name}] url does not support continue!`)
        lastChunks = []
        receivedLength = 0
      }

      const reader = response.body.getReader();
      const contentLength = +response.headers.get('Content-Length');
      console.log(`[${fetchFile.name}] content length is ${contentLength}`)

      while(true) {
        const {done, value} = await reader.read();
        if (done) break;

        lastChunks.push(value);
        receivedLength += value.length;

        const step = Math.round((receivedLength / contentLength) * 100);
        console.log(`[${fetchFile.name}] progress: ${step}%`)
        onProgress({
          progress: step,
          log: `${fetchFile.name}: downloading (${step}%)`
        })
      }

      chunksAll = new Uint8Array(receivedLength);
      let position = 0;
      for(let chunk of lastChunks) {
        chunksAll.set(chunk, position);
        position += chunk.length;
      }

      onProgress({ log: 'fetch completed.' })
      console.log(`[${fetchFile.name}] fetch completed.`)
      return chunksAll;
    } catch (e) {
      console.warn(`[${fetchFile.name}] error fetching ${requestUrl}: ${e.message}`)
      console.warn(`[${fetchFile.name}] retrying in 2 sec...`)
      onProgress({
        log: `${fetchFile.name}: error occured, retrying in 2 sec...`
      })

      if (!(currentRetries <= maxRetries)) {
        console.error(`[${fetchFile.name}] max retries exceeded! aborted download.`)
        throw new Error(`${fetchFile.name}: max retries exceeded! download error : ${e.message}`)
      }
      await sleep(3000)

      currentRetries += 1
      console.log(`[${fetchFile.name}] retrying (${currentRetries}/${maxRetries})`)
    }
  }
}


export const runDownloadTask = async (options, onProgress = () => {}) => {
  onProgress({ title: `[${runDownloadTask.name}]`, log: `${runDownloadTask.name}: getting ready...` })

  try {
    console.log(`[${runDownloadTask.name}] requesting extract to api`)

    const responseObj = await extractUrlInfo(options, (log) => {
      onProgress({ title: `[${runDownloadTask.name}]`, log: `${runDownloadTask.name}: ${log}` })
    })

    console.log(`[${runDownloadTask.name}] got url info: ${JSON.stringify(responseObj, {}, 2)}`)

    const urlInfoList = responseObj.info
    const playlistDataList = []

    for (const urlInfo of urlInfoList) {
      const urls = urlInfo.url.split(" | ")
      const fileDataList = []

      onProgress({ title: urlInfo.title, log: `${runDownloadTask.name}: cooldown 5 sec before download...`})
      await sleep(5000)

      for (const url of urls) {
        const fileData = await fetchFile(url, (progress) => {
          onProgress({ title: urlInfo.title, progress: progress.progress, log: `${runDownloadTask.name}: ${progress.log}` })
        })

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
    console.error(`[${runDownloadTask.name}] ${e.message}`)

    onProgress({ title: `[${runDownloadTask.name}]`, log: `${e}` })
    throw new Error(`${runDownloadTask.name}: ${e.message}`)
  }

}