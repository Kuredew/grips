import { API_URL, PROXY_URL } from "@/lib/api/config";
import type { ApiRequest, ApiResponse } from "@/lib/api/types";
import { downloadWithProgress, type ProgressType } from "@/lib/utils";
import { M3U8Downloader } from "@/lib/M3U8Downloader";

export const extractMediaUrl = async (
  request: ApiRequest,
  logCb: (log: string) => void,
): Promise<ApiResponse | null> => {
  const requestUrl = `${API_URL}/extract`;

  let latestResponse: ApiResponse | null = null;
  try {
    console.log(`Processing request...`);

    const response = await fetch(requestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok || !response.body) {
      console.error("Error response isn't ok: " + response.status);
      throw new Error(`Response isn't ok: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    let buffer: string | undefined = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value);
      if (!buffer) continue;

      const lines: string[] = buffer.split("\n");
      buffer = lines.pop();

      for (const line of lines) {
        try {
          // console.log(line);

          const response: ApiResponse = JSON.parse(line);
          latestResponse = response;
          logCb(latestResponse.log);
        } catch (e) {
          if (e instanceof Error)
            console.warn("Error parsing JSON Response: " + e.message);
        }
      }
    }

    if (!latestResponse) throw new Error("Latest response is undefined");

    if (latestResponse.status === "ERROR") {
      throw new Error(latestResponse.description);
    }

    // console.log("Success: " + JSON.stringify(latestResponse));
    return latestResponse;
  } catch (error) {
    if (error instanceof Error) {
      console.error("[extract]" + error.message);
      throw error;
    }

    return latestResponse;
  }
};

export const proxiedDownload = async (
  url: string,
  cb: (progress: ProgressType) => void,
) => {
  const finalUrl = `${PROXY_URL}?url=${encodeURIComponent(url)}`;

  console.log("[proxied_download] downloading " + finalUrl);
  return await downloadWithProgress(finalUrl, cb, true);
};

export const proxiedM3U8Download = async (
  url: string,
  cb: (progress: ProgressType) => void,
): Promise<ArrayBuffer> => {
  const downloader = new M3U8Downloader();

  console.log("[proxied_M3U8_download] downloading " + url);
  return new Promise((resolve, reject) =>
    downloader
      .start(url, { returnBlob: true, proxyUrl: `${PROXY_URL}?url=` })
      .on("finished", async (blob) => {
        resolve(await blob.arrayBuffer());
      })
      .on("progress", (p) => {
        cb({
          received: p.downloaded,
          total: p.total,
          percent: p.percentage,
        });
      })
      .on("error", (err) => {
        reject(err);
      }),
  );
};
