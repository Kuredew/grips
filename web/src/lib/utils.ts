import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sleep = (sleepMs: number) => {
  return new Promise((resolve) => setTimeout(resolve, sleepMs));
};

export type ProgressType = {
  received: number;
  total: number;
  percent: number;
};

export async function downloadWithProgress(
  url: string,
  cb: (progress: ProgressType) => void,
  withRangeHeader: boolean = false,
): Promise<ArrayBuffer> {
  let receivedLength = 0;
  const chunks: Uint8Array<ArrayBuffer>[] = [];

  while (true) {
    try {
      const options = {
        headers: {
          Range: `bytes=${receivedLength}-`,
        },
      };

      const response = await fetch(url, withRangeHeader ? options : {});
      if (!response.headers || !response.body) break;

      const totalLength = parseInt(
        response.headers.get("Content-Length") || "0",
      );
      const reader = response.body.getReader();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        chunks.push(value);
        receivedLength += value.length;

        const percent = totalLength
          ? Math.round((receivedLength / totalLength) * 100)
          : 0;
        // console.log(
        //   `Received ${receivedLength} of ${totalLength} (${percent}%)`,
        // );
        cb({ received: receivedLength, total: totalLength, percent: percent });
      }

      break;
    } catch (e) {
      console.log("Download Failed: " + e);
      console.log("Retrying...");
      await sleep(1000);
    }
  }

  const data = new Uint8Array(receivedLength);
  let position = 0;
  chunks.forEach((value) => {
    data.set(value, position);
    position += value.length;
  });

  return data.buffer;
}

export const downloadBufferFile = (bufferFile: BlobPart, name: string) => {
  const url = URL.createObjectURL(new Blob([bufferFile]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", name);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];

  // Mencari indeks satuan yang tepat
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};
