import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { toBlobURL } from "@ffmpeg/util";
import { create } from "zustand";

export const useFFmpeg = create((set, get) => ({
    ffmpeg: new FFmpeg(),
    loaded: false,
    status: '',
    setProgress: null,
    loadFFmpeg: async () => {
      const { setProgress, ffmpeg, status, loaded } = get()

      if (status === 'loading' || loaded) {console.error('[useFFmpeg] ignore load because ffmpeg is loading or was loaded'); return}
      set({ status: 'loading' })

      console.log('[useFFmpeg] loading ffmpeg...')
      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm';
      
      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      })

      // listen progress
      ffmpeg.on('progress', ({progress}) => {
        setProgress(Math.round(progress * 100))
      })

      console.log('[useFFmpeg] loaded ffmpeg')
      set({ loaded: true, status: 'idle' })
    },
    downloadFile: async (url, setLog, setProgress) => {
      setLog('getting ready...')
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

        const step = Math.round((receivedLength / contentLength) * 100);
        setProgress(step);
        setLog(`downloading (${step})`)
      }

      const chunksAll = new Uint8Array(receivedLength);
      let position = 0;
      for(let chunk of chunks) {
        chunksAll.set(chunk, position);
        position += chunk.length;
      }

      setLog('download completed.')
      return chunksAll;
    },
    convertVideoToH264: async (file, newFileName) => {
      const { loaded, loadFFmpeg, ffmpeg } = get()
      const newFile = `${newFileName}.mp4`
      
      if (!loaded) await loadFFmpeg();

      await ffmpeg.writeFile('video.mov', await fetchFile(file))
      await ffmpeg.exec(['-i', 'video.mov', newFile])

      const convertedFileChunk = await ffmpeg.readFile(newFile)
      const newUrl = URL.createObjectURL(new Blob([convertedFileChunk.buffer], { type: 'video/mp4' }))
      return newUrl
    }
  })
)