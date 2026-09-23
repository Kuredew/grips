package model

type InfoRequest struct {
	URL string `json:"url" form:"url"`
}

type DownloadRequest struct {
	URL     string `json:"url" form:"url"`
	Format  string `json:"format" form:"format"`
	Quality string `json:"quality" form:"quality"`
	Audio   bool   `json:"audio" form:"audio"`
}

type VideoFormat struct {
	FormatID   string `json:"format_id"`
	Ext        string `json:"ext"`
	Resolution string `json:"resolution"`
	Filesize   int64  `json:"filesize"`
	VCodec     string `json:"vcodec"`
	ACodec     string `json:"acodec"`
	Note       string `json:"note"`
}

type VideoInfo struct {
	ID          string        `json:"id"`
	Title       string        `json:"title"`
	Description string        `json:"description"`
	Duration    int           `json:"duration"`
	Thumbnail   string        `json:"thumbnail"`
	Uploader    string        `json:"uploader"`
	ViewCount   int64         `json:"view_count"`
	Formats     []VideoFormat `json:"formats"`
}

type DownloadResponse struct {
	DownloadID string `json:"download_id"`
	Status     string `json:"status"`
	Message    string `json:"message"`
}

type StreamEvent struct {
	Event string      `json:"event"`
	Data  interface{} `json:"data"`
}

type DoneEventData struct {
	FileURL  string `json:"file_url"`
	FileName string `json:"file_name"`
	FileSize int64  `json:"file_size"`
}

type ProgressEventData struct {
	Log   string `json:"log"`
	Error bool   `json:"error"`
	Done  bool   `json:"done"`
}

type ErrorEventData struct {
	Message string `json:"message"`
}
