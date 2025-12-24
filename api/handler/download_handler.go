package handler

import (
	"encoding/json"
	"net/http"

	"github.com/Kuredew/grips/internal/downloader"
)

type DownloadHandler struct {
	Worker downloader.YtdlpDownloader
}

func (h *DownloadHandler) HandleGetInfo(w http.ResponseWriter, r *http.Request) {
	url := r.URL.Query().Get("url")

	title, err := h.Worker.GetTitle(url)
	if err != nil {
		http.Error(w, "Failed to get video title : "+err.Error(), http.StatusInternalServerError)
		return
	}

	response := map[string]string{"title": title, "url": url}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (h *DownloadHandler) HandleExtractVideo(w http.ResponseWriter, r *http.Request) {
	url := r.URL.Query().Get("url")

	downloadUrls, err := h.Worker.ExtractVideoUrls(url)
	if err != nil {
		http.Error(w, "Failed to get download urls : "+err.Error(), http.StatusInternalServerError)
		return
	}

	response := map[string][]string{"urls": downloadUrls}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
