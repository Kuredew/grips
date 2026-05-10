// Define interfaces for better type safety
export interface DownloadProgress {
  segment: number;
  total: number;
  percentage: number;
  downloaded: number;
  status: string;
}

export interface M3U8Options {
  filename?: string;
  returnBlob?: boolean;
  proxyUrl?: string;
}

// Define callback types
type ProgressCallback = (payload: DownloadProgress) => void;
type FinishedCallback = (blob: Blob) => void;
type ErrorCallback = (err: string) => void;
type AbortedCallback = () => void;

interface M3U8Callbacks {
  progress: ProgressCallback;
  finished: FinishedCallback;
  error: ErrorCallback;
  aborted: AbortedCallback;
}

export class M3U8Downloader {
  private isIOS: boolean =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.platform);

  public start(m3u8Url: string, options: M3U8Options = {}) {
    const callbacks: M3U8Callbacks = {
      progress: () => {},
      finished: () => {},
      error: () => {},
      aborted: () => {},
    };

    const abortController = new AbortController();

    const controlObject = {
      on: <K extends keyof M3U8Callbacks>(event: K, cb: M3U8Callbacks[K]) => {
        callbacks[event] = cb;
        return controlObject;
      },
      abort: () => {
        abortController.abort();
        callbacks.aborted();
      },
    };

    this.initDownload(m3u8Url, options, callbacks, abortController.signal);

    return controlObject;
  }

  private async initDownload(
    url: string,
    options: M3U8Options,
    callbacks: M3U8Callbacks,
    signal: AbortSignal,
  ): Promise<void> {
    if (this.isIOS) {
      return callbacks.error("Downloading on iOS is not supported.");
    }

    try {
      const targetUrl = options.proxyUrl
        ? `${options.proxyUrl}${encodeURIComponent(url)}`
        : url;
      const response = await fetch(targetUrl, { signal });

      if (!response.ok)
        throw new Error(`Failed to fetch manifest: ${response.statusText}`);

      const text = await response.text();
      const baseUrl = new URL(url);

      // Extract Init Segment (EXT-X-MAP)
      let initUrl: string | null = null;
      const mapMatch = text.match(/#EXT-X-MAP:URI="([^"]+)"/);
      if (mapMatch) {
        initUrl = new URL(mapMatch[1], baseUrl).href;
      }

      // Extract Video Segments
      const segmentReg = /^(?!#)(.+)$/gm;
      const matches = text.match(segmentReg);

      if (!matches) {
        throw new Error("Invalid m3u8 playlist: No segments found.");
      }

      const segmentUrls = matches.map((v) => new URL(v.trim(), baseUrl).href);
      const downloadedBuffers = await this.recurseDownload(
        segmentUrls,
        options,
        callbacks,
        signal,
        initUrl,
      );

      const finalBlob = new Blob(downloadedBuffers, { type: "video/mp4" });

      if (options.returnBlob) {
        callbacks.finished(finalBlob);
      } else {
        this.downloadInBrowser(finalBlob, options.filename || "video.mp4");
        callbacks.finished(finalBlob);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.name === "AbortError") return;
        callbacks.error(err.message);
      } else {
        callbacks.error(String(err));
      }
    }
  }

  private async recurseDownload(
    urls: string[],
    options: M3U8Options,
    callbacks: M3U8Callbacks,
    signal: AbortSignal,
    initUrl: string | null,
  ): Promise<ArrayBuffer[]> {
    const data: ArrayBuffer[] = [];
    let totalSize = 0;

    // Download Init Segment if exists
    if (initUrl) {
      const finalInitUrl = options.proxyUrl
        ? `${options.proxyUrl}${encodeURIComponent(initUrl)}`
        : initUrl;
      const resp = await fetch(finalInitUrl, { signal });
      if (resp.ok) {
        const buffer = await resp.arrayBuffer();
        data.push(buffer);
        totalSize += buffer.byteLength;
      }
    }

    // Download Video Segments
    for (let i = 0; i < urls.length; i++) {
      if (signal.aborted) throw new Error("AbortError");

      const finalUrl = options.proxyUrl
        ? `${options.proxyUrl}${encodeURIComponent(urls[i])}`
        : urls[i];
      const resp = await fetch(finalUrl, { signal });

      if (!resp.ok) continue; // Or handle error

      const buffer = await resp.arrayBuffer();
      data.push(buffer);
      totalSize += buffer.byteLength;

      callbacks.progress({
        segment: i + 1,
        total: urls.length,
        percentage: Math.floor(((i + 1) / urls.length) * 100),
        downloaded: totalSize,
        status: "Downloading...",
      });
    }

    return data;
  }

  private downloadInBrowser(blob: Blob, filename: string): void {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  }
}
