// import { useFFmpeg } from "../store/useFfmpeg";
import { useNotification } from "../store/useNotification";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
// import { useSetting } from "../store/useSetting";

const getDownloadableUrl = async (url) => {
  const requestUrl = `/api/extract?url=${url}&mode=video&resolution=720`

  console.log('[getDownloadable] getting downlodable url to ' + requestUrl)

  try {
    const response = await fetch(requestUrl)

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');

    let lastResponseObj
    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunkJsonString = decoder.decode(value)
      const jsonObj = JSON.parse(chunkJsonString)
      console.log(jsonObj)

      lastResponseObj = jsonObj
    } 

    console.log('[getDownloadable] finished getting downloadable url')
    return lastResponseObj
  } catch (error) {
    console.log('[getDownloadable] error getting downloadble url: ' + error)
    return
  }
}

export const runDownloadTask = async (id, url) => {
  const infoObj = await getDownloadableUrl(url)
  if (!infoObj) {
    useNotification.getState().updateNotifFromId(id, { title: 'error occured!', message: 'im sorry but we have technical problem here.', canDelete: true })
    console.log('[download] error getting url info')
    return
  }

  console.log('[download] got url info:' + JSON.stringify(infoObj, {}, 2))
}