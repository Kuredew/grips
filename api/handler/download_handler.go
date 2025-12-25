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

type responseStatus string

const (
	WAIT     responseStatus = "WAIT"
	ERROR    responseStatus = "ERROR"
	COMPLETE responseStatus = "COMPLETE"
)

type Response struct {
	Status      responseStatus
	Description string
	Log         string
	Info        downloader.URLInfo
}

func (h *DownloadHandler) respondStream(w http.ResponseWriter, payload Response, flush bool) {
	flusher, ok := w.(http.Flusher)
	if !ok {
		payload.Status = ERROR
		payload.Description = "Streaming is not supported by server"
		h.Log.Error("Streaming is not supported!")
	}

	response, _ := json.Marshal(payload)

	w.Header().Set("Content-Type", "application/json")
	w.Write(response)

	if flush {
		flusher.Flush()
	}
}

func (h *DownloadHandler) respond(w http.ResponseWriter, code int, payload Response) {
	response, _ := json.Marshal(payload)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	w.Write(response)
}

func (h *DownloadHandler) HandleGetInfo(w http.ResponseWriter, r *http.Request) {
	h.Log.Info("Started getinfo handler")

	url := r.URL.Query().Get("url")
	if url == "" {
		h.Log.Error("Rejected request because URL is empty")
		return
	}

	URLInfo, err := h.Worker.GetTitle(url)
	if err != nil {
		payload := Response{
			Status:      ERROR,
			Description: err.Error(),
		}
		h.respond(w, http.StatusInternalServerError, payload)
		h.Log.Error("Error getting title from worker")
		return
	}

	h.Log.Info("Completed without error")
	payload := Response{
		Info:        URLInfo,
		Status:      COMPLETE,
		Description: "yt-dlp completed the request",
	}
	h.respond(w, http.StatusOK, payload)
}

func (h *DownloadHandler) HandleExtractVideo(w http.ResponseWriter, r *http.Request) {
	var URLInfo downloader.URLInfo
	var errWorker error

	h.Log.Info("Started extractVideo handler")

	url := r.URL.Query().Get("url")
	if url == "" {
		h.Log.Error("Rejected request because URL is empty")
		return
	}

	logChan := make(chan string)
	done := make(chan struct{})

	go func() {
		URLInfo, errWorker = h.Worker.ExtractVideoUrls(url, logChan)
		close(done)
	}()

	h.Log.Info("Started streaming...")

	for {
		select {
		case logLine, ok := <-logChan:
			if ok {
				payload := Response{
					Status:      WAIT,
					Description: "waiting yt-dlp to complete the request.",
					Log:         logLine,
				}

				h.respondStream(w, payload, true)
			}
		case <-done:
			payload := Response{
				Info:        URLInfo,
				Status:      COMPLETE,
				Description: "yt-dlp completed the request",
			}
			if errWorker != nil {
				payload.Status = ERROR
				payload.Description = errWorker.Error()
			}

			h.respondStream(w, payload, false)
			h.Log.Info("Completed without error")

			// dont forget to return hehe.
			return
		}
	}
}
