package handler

import (
	"io"
	"net/http"

	"github.com/sirupsen/logrus"
)

type ProxyHandler struct {
	Log *logrus.Logger
}

func (p *ProxyHandler) RequestHandler(w http.ResponseWriter, r *http.Request) {
	p.Log.Info("Got proxy request!")

	targetURL := r.URL.Query().Get("url")
	if targetURL == "" {
		http.Error(w, "URL parameter is required", http.StatusBadRequest)
		return
	}

	resp, err := http.Get(targetURL)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadGateway)
		return
	}
	defer resp.Body.Close()

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")

	w.Header().Set("Content-Type", resp.Header.Get("Content-Type"))
	w.Header().Set("Content-Length", resp.Header.Get("Content-Length"))

	p.Log.Info("All header copied.")
	p.Log.Info("Forwading...")

	io.Copy(w, resp.Body)
}
