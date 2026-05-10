import { create } from "zustand";
import { FFmpeg, type FileData } from "@ffmpeg/ffmpeg";
import { downloadWithProgress, sleep } from "@/lib/utils";
import { nanoid } from "nanoid";

type FFmpegJob = {
  queueID: string;
  processID: string;
  args: string[];
};

type CodecOpts = {
  enabled: boolean;
  vCodec?: string;
  aCodec?: string;
};

type useFFmpegProps = {
  status: "ready" | "loading" | "loaded" | "processing";
  ffmpeg: FFmpeg;
  currentJob: FFmpegJob | null;
  jobs: Promise<void>;
  jobsProgress: number;
  loadReceived: number;
  loadProgress: number;
  loadFFmpeg: () => Promise<void>;
  merge: (
    queueID: string,
    processID: string,
    outputExt: string,
    mediaBuffers: ArrayBuffer[],
    codecOpts: CodecOpts,
  ) => Promise<FileData>;
  addJob: (job: FFmpegJob) => Promise<void>;
};

export const useFFmpegStore = create<useFFmpegProps>((set, get) => ({
  status: "ready",
  ffmpeg: new FFmpeg(),
  currentJob: null,
  jobs: Promise.resolve(),
  jobsProgress: 0,
  loadReceived: 0,
  loadProgress: 0,
  loadFFmpeg: async () => {
    const { loadFFmpeg } = get();

    set({ status: "loading" });
    const { ffmpeg } = get();
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm";
    const coreSrc = `${baseURL}/ffmpeg-core.js`;
    const wasmSrc = `${baseURL}/ffmpeg-core.wasm`;

    ffmpeg.on("progress", (ProgressEvent) => {
      set({
        jobsProgress: Math.floor(ProgressEvent.progress * 100),
      });
    });

    try {
      const coreBuffer = await downloadWithProgress(coreSrc, (progress) => {
        const totalBytes = 112059;

        set({
          loadReceived: progress.received,
          loadProgress: Math.round((progress.received / totalBytes) * 100),
        });
      });
      const wasmBuffer = await downloadWithProgress(wasmSrc, (progress) => {
        const totalBytes = 32129114;

        set({
          loadReceived: progress.received,
          loadProgress: Math.round((progress.received / totalBytes) * 100),
        });
      });

      const wasmBlob = new Blob([wasmBuffer], { type: "application/wasm" });
      const coreBlob = new Blob([coreBuffer], { type: "text/javascript" });
      const coreURL = URL.createObjectURL(coreBlob);
      const wasmURL = URL.createObjectURL(wasmBlob);

      await ffmpeg.load({
        coreURL,
        wasmURL,
      });

      set({ status: "loaded" });
    } catch (e) {
      console.error(e);

      sleep(1000);
      loadFFmpeg();
    }
  },
  merge: async (queueID, processID, outputExt, mediaBuffers, codecOpts) => {
    const { ffmpeg, status, addJob } = get();
    if (status !== "loaded") throw new Error("FFmpeg not loaded");

    const ffmpegArgs = [];

    for (const mediaBuffer of mediaBuffers) {
      const mediaRef = nanoid();
      await ffmpeg.writeFile(mediaRef, new Uint8Array(mediaBuffer));

      ffmpegArgs.push("-i", mediaRef);
    }

    const outputRef = `${nanoid()}.${outputExt}`;
    if (codecOpts.enabled) {
      if (codecOpts.vCodec) ffmpegArgs.push("-c:v", codecOpts.vCodec);
      if (codecOpts.aCodec) ffmpegArgs.push("-c:a", codecOpts.aCodec);
    }

    ffmpegArgs.push(outputRef);
    await addJob({ queueID, processID, args: ffmpegArgs });
    return await ffmpeg.readFile(outputRef);
  },
  addJob: (job) => {
    const { ffmpeg } = get();

    return new Promise((resolve) => {
      set((s) => ({
        jobs: s.jobs.then(async () => {
          console.log(`[job] Executing ffmpeg with params: ${job.args}`);
          set({
            currentJob: {
              processID: job.processID,
              queueID: job.queueID,
              args: job.args,
            },
          });
          await ffmpeg.exec(job.args);
          resolve();
        }),
      }));
    });
  },
}));
