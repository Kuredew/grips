import {
  extractMediaUrl,
  proxiedDownload,
  proxiedM3U8Download,
} from "@/lib/api/fetcher";
import type { ApiRequest } from "@/lib/api/types";
import { downloadBufferFile, formatBytes, sleep } from "@/lib/utils";
import { useFFmpegStore } from "@/store/useFfmpegStore";
import { nanoid } from "nanoid";
import { create } from "zustand";
import { toast } from "sonner";

type Progress = {
  processID: string;
  message: string;
  progress: number;
};

export type Queue = {
  id: string;
  status: "loading" | "started" | "failed" | "completed";
  mode: "video" | "audio";
  message: string;
  progressList: Progress[];
  data: Partial<{
    name: string;
    url: string;
    src: string;
  }>;
};

export type QueueOptions = {
  videoContainer?: string;
  videoCodec?: string;
  audioContainer?: string;
  encodeAudio?: boolean;
};

type useQueueProps = {
  queues: Queue[];
  setQueue: (queueID: string, queue: Partial<Queue>) => void;
  setProgressFromQueue: (
    queueID: string,
    processID: string,
    progress: Partial<Progress>,
  ) => void;
  addProgressToQueue: (queueID: string, progress?: Progress) => void;
  addQueue: (queueRequest: ApiRequest, options?: QueueOptions) => void;
};

export const useQueueStore = create<useQueueProps>((set, get) => ({
  queues: [],
  setQueue: (id, queue) => {
    set((s) => ({
      queues: s.queues.map((m) =>
        m.id === id
          ? {
              ...m,
              ...queue,
              data: {
                ...m.data,
                ...queue.data,
              },
            }
          : m,
      ),
    }));

    queue.progressList?.forEach((p) => {
      set((s) => ({
        queues: s.queues.map((m) =>
          m.id === id
            ? {
                ...m,
                progressList: m.progressList?.map((progress) =>
                  p.processID === progress.processID
                    ? {
                        ...progress,
                        ...p,
                      }
                    : progress,
                ),
              }
            : m,
        ),
      }));
    });
  },
  setProgressFromQueue: (id, processID, progress) => {
    set((s) => ({
      queues: s.queues.map((m) =>
        m.id === id
          ? {
              ...m,
              progressList: m.progressList?.map((p) =>
                p.processID === processID
                  ? {
                      ...p,
                      ...progress,
                    }
                  : p,
              ),
            }
          : m,
      ),
    }));
  },
  addProgressToQueue: (id, progress) => {
    set((s) => ({
      queues: s.queues.map((m) =>
        m.id === id
          ? {
              ...m,
              progressList: progress ? [...m.progressList, progress] : [],
            }
          : m,
      ),
    }));
  },
  addQueue: async ({ url, mode, option }, options) => {
    const { addProgressToQueue, setQueue, setProgressFromQueue } = get();
    const { merge } = useFFmpegStore.getState();

    const id = nanoid();
    const queue: Queue = {
      id: id,
      status: "loading",
      message: "Getting media info...",
      mode,
      progressList: [],
      data: {
        name: "Untitled Media",
        url,
      },
    };

    // masukin dulu queue baru kedalam state queues
    set((s) => ({
      queues: [queue, ...s.queues],
    }));

    // abis itu fetch ke api buat ambil informasi dari urlnya
    try {
      let steps = 0;
      const response = await extractMediaUrl(
        {
          url,
          mode,
          option,
        },
        () => {
          steps += 1;
          setQueue(id, {
            message: `Extracting (${steps} Steps)`,
          });
        },
      );

      // console.log(`[${id}] Api response: ${JSON.stringify(response)}`);
      setQueue(id, {
        message: "Extract success.",
      });

      console.log(`[queue_${id}] Waiting 2 second before downloading`);
      await sleep(2000);

      const playlistBuffers = [];
      if (!response || !response.info)
        throw new Error("Api response is undefined");

      for (const info of response.info) {
        setQueue(id, {
          data: {
            name: info.title,
          },
          status: "started",
        });
        const urlList = info.url.split("<separator>");

        toast.info(`queue (${id}) downloading ${urlList.length} buffer`);
        const mediaBuffers: ArrayBuffer[] = await Promise.all(
          urlList.map(async (url) => {
            const processID = nanoid();
            addProgressToQueue(id, {
              processID,
              message: `Downloading Buffer...`,
              progress: 0,
            });

            console.log(
              `[queue_${id}] Added download job to ${url} with pid ${processID}`,
            );

            let buffer: ArrayBuffer;
            if (url.endsWith(".m3u8")) {
              console.log(`[queue_${id}] Downloading using m3u8 method`);

              buffer = await proxiedM3U8Download(
                url,
                ({ percent, received }) => {
                  setProgressFromQueue(id, processID, {
                    message: `Downloading HLS Buffer (${formatBytes(received)})...`,
                    progress: percent,
                  });
                },
              );
            } else {
              console.log(`[queue_${id}] Downloading using proxy method`);

              buffer = await proxiedDownload(url, ({ percent, received }) => {
                setProgressFromQueue(id, processID, {
                  message: `Downloading Buffer (${formatBytes(received)})...`,
                  progress: percent,
                });
              });
            }

            return buffer;
          }),
        );

        playlistBuffers.push({
          title: info.title,
          ext: info.ext,
          mediaBuffers,
        });
      }
      addProgressToQueue(id);

      const outputBuffers = await Promise.all(
        playlistBuffers.map(async (mediaBuffersObj, index) => {
          let ext: string = mediaBuffersObj.ext;
          if (mode === "video" && options?.videoContainer)
            ext = options.videoContainer;
          if (mode === "audio" && options?.audioContainer)
            ext = options.audioContainer;

          let outputFileData;
          if (mode === "video" || options?.encodeAudio) {
            const processID = nanoid();
            console.log(`[queue_${id}] Added encode job with pid ${processID}`);
            addProgressToQueue(id, {
              processID,
              message: `Encoding ${ext} container (${index + 1}/${playlistBuffers.length})`,
              progress: 0,
            });

            outputFileData = await merge(
              id,
              processID,
              ext,
              mediaBuffersObj.mediaBuffers,
              {
                enabled: mode === "video" && options?.videoCodec !== "disable",
                vCodec: options?.videoCodec,
              },
            );
          } else {
            outputFileData = mediaBuffersObj.mediaBuffers.pop();
          }

          const cleanBuffer = new Uint8Array(outputFileData as Uint8Array);

          return {
            buffer: cleanBuffer,
            fileName: `${mediaBuffersObj.title}.${ext}`,
          };
        }),
      );
      // remove all progress
      addProgressToQueue(id);

      setQueue(id, {
        status: "completed",
        message: `Process completed.`,
      });
      toast.success(`queue (${id}) completed!`);

      outputBuffers.forEach((outputBuffer) => {
        downloadBufferFile(outputBuffer.buffer, outputBuffer.fileName);
      });
    } catch (e) {
      if (e instanceof Error) {
        console.error(`[queue_${id}] ` + e.message);
        toast.error(`queue (${id}) failed!`);

        setQueue(id, {
          status: "failed",
          message: `Please try again or report this to repository issue (${e})`,
          data: {
            name: "Process failed",
          },
        });
      }
    }
  },
}));
