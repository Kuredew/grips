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

	// 1. Ambil URL target dari query parameter
	targetURL := r.URL.Query().Get("url")
	if targetURL == "" {
		http.Error(w, "URL parameter is required", http.StatusBadRequest)
		return
	}

	// 2. Buat request baru ke URL target
	resp, err := http.Get(targetURL)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadGateway)
		return
	}
	defer resp.Body.Close()

	// 3. Tambahkan Header CORS agar Browser tidak memblokir
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")

	// Teruskan tipe konten (video/mp4, dsb)
	w.Header().Set("Content-Type", resp.Header.Get("Content-Type"))
	w.Header().Set("Content-Length", resp.Header.Get("Content-Length"))

	p.Log.Info("All header copied.")
	p.Log.Info("Forwading...")
	// 4. Stream data langsung ke response frontend (Efisien RAM)
	io.Copy(w, resp.Body)
}
