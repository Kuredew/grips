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
	Status      responseStatus       `json:"status"`
	Description string               `json:"description"`
	Log         string               `json:"log"`
	Info        []downloader.URLInfo `json:"info"`
}

func (h *DownloadHandler) HandleExtract(w http.ResponseWriter, r *http.Request) {
	var URLInfo []downloader.URLInfo
	var options downloader.Options
	var errWorker error
	var lastLog string

	encoder := json.NewEncoder(w)
	flusher, _ := w.(http.Flusher)
	w.Header().Set("Content-Type", "application/json")

	h.Log.Info("Started extractVideo handler")
	err := json.NewDecoder(r.Body).Decode(&options)
	if err != nil {
		h.Log.Error(err.Error())
		encoder.Encode(Response{
			Status:      ERROR,
			Description: err.Error(),
		})
		return
	}

	// validate
	if !options.IsValid() {
		errorStr := "Rejected request because some url parameter is not valid"
		h.Log.Error(errorStr)
		encoder.Encode(Response{
			Status:      ERROR,
			Description: errorStr,
		})
		return
	}

	logChan := make(chan string)
	done := make(chan struct{})

	go func() {
		URLInfo, errWorker = h.Worker.Extract(options, logChan)
		close(done)
	}()

	h.Log.Info("Started streaming...")

	for {
		select {
		case logLine, ok := <-logChan:
			if ok {
				lastLog = logLine
				payload := Response{
					Status:      WAIT,
					Description: "waiting yt-dlp to complete the request.",
					Log:         logLine,
				}

				encoder.Encode(payload)
				flusher.Flush()
			}
		case <-done:
			payload := Response{
				Info:        URLInfo,
				Status:      COMPLETE,
				Description: "yt-dlp completed the request",
			}

			if errWorker != nil {
				encoder.Encode(Response{
					Status:      ERROR,
					Log:         lastLog,
					Description: errWorker.Error(),
				})

				h.Log.Errorf("Completed with yt-dlp error: %v", errWorker.Error())
				return
			}

			encoder.Encode(payload)
			h.Log.Info("Completed without error")

			// dont forget to return hehe.
			return
		}
	}
}
