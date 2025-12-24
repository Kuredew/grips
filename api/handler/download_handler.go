package handler

import (
	"encoding/json"
	"net/http"

	"github.com/Kuredew/grips/internal/downloader"
	"github.com/sirupsen/logrus"
)

type DownloadHandler struct {
	Log    *logrus.Logger
	Worker downloader.YtdlpDownloader
}

func (h *DownloadHandler) HandleGetInfo(w http.ResponseWriter, r *http.Request) {
	h.Log.Info("Started getinfo handler")

	url := r.URL.Query().Get("url")
	if url == "" {
		h.Log.Error("Rejected request because URL is empty")
		return
	}

	title, err := h.Worker.GetTitle(url)
	if err != nil {
		http.Error(w, "Failed to get video title : "+err.Error(), http.StatusInternalServerError)
		h.Log.Error("Error getting title from worker")
		return
	}

	h.Log.Info("Completed without error")
	response := map[string]string{"title": title, "url": url}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (h *DownloadHandler) HandleExtractVideo(w http.ResponseWriter, r *http.Request) {
	h.Log.Info("Started extractVideo handler")

	url := r.URL.Query().Get("url")
	if url == "" {
		h.Log.Error("Rejected request because URL is empty")
		return
	}

	downloadUrls, err := h.Worker.ExtractVideoUrls(url)
	if err != nil {
		http.Error(w, "Failed to get download urls : "+err.Error(), http.StatusInternalServerError)
		h.Log.Error("Error getting url from worker")
		return
	}

	h.Log.Info("Completed without error")
	response := map[string][]string{"urls": downloadUrls}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
