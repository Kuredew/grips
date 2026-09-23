package handler

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"grips/internal/service"
)

type InfoHandler struct {
	ytdlp *service.YTDLP
}

func NewInfoHandler(ytdlp *service.YTDLP) *InfoHandler {
	return &InfoHandler{ytdlp: ytdlp}
}

func (h *InfoHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	url := r.URL.Query().Get("url")
	if url == "" {
		http.Error(w, "Missing 'url' parameter", http.StatusBadRequest)
		return
	}

	ctx, cancel := context.WithTimeout(r.Context(), 30*time.Second)
	defer cancel()

	info, err := h.ytdlp.GetInfo(ctx, url)
	if err != nil {
		http.Error(w, "Failed to get video info: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(info)
}

