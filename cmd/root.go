package cmd

import (
	"net/http"

	"github.com/Kuredew/grips/api/handler"
	"github.com/Kuredew/grips/internal/downloader"
)

func Init() {
	ytdlp := downloader.YtdlpDownloader{BinaryPath: "./bin/ytdlp"}

	h := handler.DownloadHandler{Worker: ytdlp}

	http.HandleFunc("/getinfo", h.HandleGetInfo)
}
