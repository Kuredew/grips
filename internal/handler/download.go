package handler

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"github.com/google/uuid"

	"grips/internal/model"
	"grips/internal/service"
)

type DownloadHandler struct {
	downloader *service.Downloader
	storage    *service.Storage
}

func NewDownloadHandler(downloader *service.Downloader, storage *service.Storage) *DownloadHandler {
	return &DownloadHandler{
		downloader: downloader,
		storage:    storage,
	}
}

func (h *DownloadHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	path := strings.TrimPrefix(r.URL.Path, "/download/")

	switch {
	case path == "video" || path == "video/":
		h.handleDownload(w, r, false)
	case path == "audio" || path == "audio/":
		h.handleDownload(w, r, true)
	default:
		http.NotFound(w, r)
	}
}

func (h *DownloadHandler) handleDownload(w http.ResponseWriter, r *http.Request, audioOnly bool) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	url := r.URL.Query().Get("url")
	if url == "" {
		http.Error(w, "Missing 'url' parameter", http.StatusBadRequest)
		return
	}

	format := r.URL.Query().Get("format")
	quality := r.URL.Query().Get("quality")

	downloadID := uuid.New().String()[:8]

	_, err := h.downloader.StartDownload(r.Context(), downloadID, url, format, quality, audioOnly)
	if err != nil {
		http.Error(w, err.Error(), http.StatusServiceUnavailable)
		return
	}

	response := model.DownloadResponse{
		DownloadID: downloadID,
		Status:     "started",
		Message:    "Download started. Connect to /stream/" + downloadID + " for progress.",
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusAccepted)
	json.NewEncoder(w).Encode(response)
}

type StreamHandler struct {
	downloader *service.Downloader
	storage    *service.Storage
}

func NewStreamHandler(downloader *service.Downloader, storage *service.Storage) *StreamHandler {
	return &StreamHandler{
		downloader: downloader,
		storage:    storage,
	}
}

func (h *StreamHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	downloadID := strings.TrimPrefix(r.URL.Path, "/stream/")
	if downloadID == "" {
		http.Error(w, "Missing download ID", http.StatusBadRequest)
		return
	}

	if _, ok := h.downloader.GetProgressChannel(downloadID); !ok {
		if h.downloader.FileExists(downloadID, "mp4") {
			h.sendDoneEvent(w, downloadID, "mp4")
			return
		}
		if h.downloader.FileExists(downloadID, "mp3") {
			h.sendDoneEvent(w, downloadID, "mp3")
			return
		}
		http.Error(w, "Download not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	flusher, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "Streaming unsupported", http.StatusInternalServerError)
		return
	}

	ctx := r.Context()
	progressChan, _ := h.downloader.GetProgressChannel(downloadID)

	for {
		select {
		case <-ctx.Done():
			return
		case progress, ok := <-progressChan:
			if !ok {
				return
			}

			event := model.StreamEvent{}
			if progress.Percent < 0 {
				event.Event = "error"
				event.Data = model.ErrorEventData{Message: progress.ETA}
			} else if progress.Percent >= 100 && progress.Speed == "done" {
				event.Event = "done"
				ext := "mp4"
				if h.downloader.FileExists(downloadID, "mp3") {
					ext = "mp3"
				}
				fileURL := h.storage.GetFileURL(downloadID, ext)
				size, _, _ := h.storage.GetFileInfo(downloadID, ext)
				event.Data = model.DoneEventData{
					FileURL:  fileURL,
					FileName: downloadID + "." + ext,
					FileSize: size,
				}
			} else {
				event.Event = "progress"
				event.Data = progress
			}

			data, _ := json.Marshal(event)
			fmt.Fprintf(w, "data: %s\n\n", data)
			flusher.Flush()

			if event.Event == "done" || event.Event == "error" {
				return
			}
		}
	}
}

func (h *StreamHandler) sendDoneEvent(w http.ResponseWriter, downloadID, ext string) {
	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")

	fileURL := h.storage.GetFileURL(downloadID, ext)
	size, _, _ := h.storage.GetFileInfo(downloadID, ext)

	event := model.StreamEvent{
		Event: "done",
		Data: model.DoneEventData{
			FileURL:  fileURL,
			FileName: downloadID + "." + ext,
			FileSize: size,
		},
	}

	data, _ := json.Marshal(event)
	fmt.Fprintf(w, "data: %s\n\n", data)
}

