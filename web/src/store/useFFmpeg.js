import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";
import { create } from "zustand";
import { nanoid } from "nanoid";

export const queueActionTypes = {
  MERGE: "merge",
  ENCODE: "encode",
}

export const useFFmpeg = create((set, get) => ({
    // FFMPEG HANDLER SYSTEM FOR GRIPS
    ffmpeg: new FFmpeg({ log: true }),
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
          processInfo: { ...state.processInfo, progress: parsedProgress, processLog: `[ffmpeg] processing (${parsedProgress})` }
        }))
      })

      console.log('[useFFmpeg] loaded ffmpeg')
      set({ loaded: true, status: 'idle' })
    },
    addQueue: ((id, inputMediaList, outputFileName, action, outputListHandler) => {
      // NB: all media must be populated by data from the media (such as chunks), not file objects or urls
      // and all output will return BlobURL.

      // naming things is always my problem
      set((state) => {
        const newQueue = { 
          id: id, 
          inputMediaList: inputMediaList,
          outputFileName: outputFileName,
          action: action,
          outputListHandler: outputListHandler,
        }

        console.log(`[useFFmpeg/addQueue] newQueue created`)
        return {
          queueList: [...state.queueList, { newQueue }]
        }
      })
    }),
    startQueue: async () => {
      const { encodeMedia, mergeMedia, status, queueList } = get()

      if (!status === 'idle') {console.warn('[useFFmpeg/startQueue] aborted startQueue request because status is not idle'); return}

      set(() => ({ status: 'processing' }))
      for (const queue of queueList) {
        // set id for process
        set((state) => ({
          processInfo: { ...state.processInfo, processId: queue.id }
        }))

        // run action
        switch (queue.action) {
          case queueActionTypes.ENCODE: {
            let outputList = []

            for (const input of queue.inputMediaList) {
              const newUrl = await encodeMedia(input, queue.outputFileName)
              outputList = [ ...outputList, newUrl ]
            }

            queue.outputHandler(outputList)
            break
          }
          case queueActionTypes.MERGE: {
            const output = await mergeMedia(queue.inputList, queue.outputFileName)

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
    encodeMedia: async (mediaDataLists, outputFileName) => {
      const { loaded, loadFFmpeg, ffmpeg } = get()
      const mediaId = nanoid(10)
      
      if (!loaded) await loadFFmpeg();

      await ffmpeg.writeFile(`${mediaId}.media`, mediaDataLists)
      await ffmpeg.exec(['-i', `${mediaId}.media`, outputFileName])

      const convertedFileChunk = await ffmpeg.readFile(outputFileName)
      const newUrl = URL.createObjectURL(new Blob([convertedFileChunk.buffer]))

      // await ffmpeg.deleteFile(`${mediaId}.media`)
      return newUrl
    },
    mergeMedia: async (id, mediaDataLists, outputFileName, reEncode = false) => {
      const { loaded, loadFFmpeg, ffmpeg } = get()
      let ffmpegArgs = []

      if (!loaded) await loadFFmpeg();

      for (const filedata of mediaDataLists) {
        const mediaId = nanoid(10)
        await ffmpeg.writeFile(`${mediaId}`, filedata)

        ffmpegArgs = [ ...ffmpegArgs, '-i', mediaId ]
      }

      if (reEncode) ffmpegArgs = [ ...ffmpegArgs, '-c:v', 'h264', '-c:a', 'aac' ]
      else ffmpegArgs = [ ...ffmpegArgs, '-c', 'copy' ]

      ffmpegArgs = [ ...ffmpegArgs, outputFileName]
      console.log(`[useFFmpeg] Merging media with args: ${ffmpegArgs}`)

      set((state) => ({ ...state, status: "processing", processInfo: { ...state.procesInfo, processId: id } }))
      await ffmpeg.exec(ffmpegArgs)

      set((state) => ({ ...state, status: "finished" }))
      return await ffmpeg.readFile(outputFileName)
    }
  })
)