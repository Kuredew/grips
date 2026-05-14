export type ApiRequest = {
  url: string;
  mode: "video" | "audio";
  option?: {
    preferredResolution?: string;
  };
};

export type ApiResponse = {
  status: string;
  description: string;
  log: string;
  info:
    | {
        title: string;
        ext: string;
        url: string;
      }[]
    | null;
};
