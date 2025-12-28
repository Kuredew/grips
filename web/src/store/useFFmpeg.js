import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { toBlobURL } from "@ffmpeg/util";
import { create } from "zustand";
import { nanoid } from "nanoid";

export const FFmpegActionTypes = {
  MERGECHUNK: "mergechunk",
  ENCODECHUNK: "encodechunk",
}


export const useFFmpeg = create((set, get) => ({
    // FFMPEG HANDLER SYSTEM FOR GRIPS
    ffmpeg: new FFmpeg(),
    loaded: false,
    status: 'unloaded',
    processInfo: {
      processId: null,
      processLog: null,
      progress: null,
    },
    queueList: [],
    // Load ffmpeg first before use ffmpeg
    loadFFmpeg: async () => {
      const { ffmpeg, status, loaded } = get()

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
        const parsedProgress = Math.round(progress * 100)

        set((state) => ({
          processInfo: { ...state.processInfo, progress: parsedProgress }
        }))
      })

      console.log('[useFFmpeg] loaded ffmpeg')
      set({ loaded: true, status: 'idle' })
    },
    addQueue: ((id, inputList, outputFileName, action, outputHandler) => {
      set((state) => {
        const newQueue = { 
          id: id, 
          inputList: inputList,
          outputFileName: outputFileName,
          action: action,
          outputHandler: outputHandler,
        }

        console.log(`[useFFmpeg/addQueue] newQueue created`)
        return {
          queueList: [...state.queueList, { newQueue }]
        }
      })
    }),
    startQueue: async () => {
      const { encodeMediaChunk, mergeMediaChunk, status, queueList } = get()

      if (!status === 'idle') {console.warn('[useFFmpeg/startQueue] aborted startQueue request because status is not idle'); return}

      set(() => ({ status: 'processing' }))
      for (const queue of queueList) {
        // set id for process
        set((state) => ({
          processInfo: { ...state.processInfo, processId: queue.id }
        }))

        // run action
        switch (queue.action) {
          case FFmpegActionTypes.ENCODECHUNK: {
            let outputList = []

            for (const input of queue.inputList) {
              const newUrl = await encodeMediaChunk(input, queue.outputFileName)
              outputList = [ ...outputList, newUrl ]
            }

            queue.outputHandler(outputList)
            break
          }
          case FFmpegActionTypes.MERGECHUNK: {
            const output = await mergeMediaChunk(queue.inputList, queue.outputFileName)

            queue.outputHandler(output)
            break
          }
        }

        set((state) => ({ 
          queueList: state.queueList.filter(prevQueue => prevQueue !== queue) 
        }))
      }

      set(() => ({status: "idle"}))
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
    encodeMedia: async (file, newFileName) => {
      const { loaded, loadFFmpeg, ffmpeg } = get()
      const mediaId = nanoid(10)
      
      if (!loaded) await loadFFmpeg();

      await ffmpeg.writeFile(`${mediaId}.media`, await fetchFile(file))
      await ffmpeg.exec(['-i', `${mediaId}.media`, newFileName])

      const convertedFileChunk = await ffmpeg.readFile(newFileName)
      const newUrl = URL.createObjectURL(new Blob([convertedFileChunk.buffer]))

      // await ffmpeg.deleteFile(`${mediaId}.media`)
      return newUrl
    },
    encodeMediaChunk: async (file, newFileName) => {
      const { loaded, loadFFmpeg, ffmpeg } = get()
      const mediaId = nanoid(10)
      
      if (!loaded) await loadFFmpeg();

      await ffmpeg.writeFile(`${mediaId}.media`, file)
      await ffmpeg.exec(['-i', `${mediaId}.media`, newFileName])

      const convertedFileChunk = await ffmpeg.readFile(newFileName)
      const newUrl = URL.createObjectURL(new Blob([convertedFileChunk.buffer]))

      // await ffmpeg.deleteFile(`${mediaId}.media`)
      return newUrl
    },
    mergeMediaChunk: async (files, newFileName) => {
      const { loaded, loadFFmpeg, ffmpeg } = get()
      let ffmpegArgs = []

      if (!loaded) await loadFFmpeg();

      for (const fileChunk of files) {
        const mediaId = nanoid(10)
        await ffmpeg.writeFile(`${mediaId}`, fileChunk)

        ffmpegArgs = [ ...ffmpegArgs, '-i', mediaId ]
      }

      // gak jadi karena ini berarti bikin fungsi ini jadi mergeMediaChunkToMP4
      // const outputFileName = `${newFileName}.mp4`

      // ini jadi bebas nyimpennya
      // awowkwkkw udh malas bikin comment bhs inggris
      const outputFileName = `${newFileName}`

      ffmpegArgs = [ ...ffmpegArgs, '-c', 'copy', outputFileName]
      await ffmpeg.exec()

      const convertedFileChunk = await ffmpeg.readFile(outputFileName)
      const newUrl = URL.createObjectURL(new Blob([convertedFileChunk.buffer]))

      // await ffmpeg.deleteFile(`${mediaId}.media`)
      return newUrl
    },
  })
)