package service

import (
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"
)

type Storage struct {
	storagePath string
	baseURL     string
}

func NewStorage(storagePath, baseURL string) *Storage {
	return &Storage{
		storagePath: storagePath,
		baseURL:     baseURL,
	}
}

func (s *Storage) ServeFile(w http.ResponseWriter, r *http.Request, downloadID, ext string) {
	fileName := downloadID + "." + ext
	filePath := filepath.Join(s.storagePath, fileName)

	if _, err := os.Stat(filePath); os.IsNotExist(err) {
		http.NotFound(w, r)
		return
	}

	w.Header().Set("Content-Disposition", `attachment; filename="`+fileName+`"`)
	w.Header().Set("Content-Type", s.getContentType(ext))
	w.Header().Set("Accept-Ranges", "bytes")

	http.ServeFile(w, r, filePath)
}

func (s *Storage) getContentType(ext string) string {
	switch strings.ToLower(ext) {
	case "mp4":
		return "video/mp4"
	case "webm":
		return "video/webm"
	case "mkv":
		return "video/x-matroska"
	case "mp3":
		return "audio/mpeg"
	case "m4a":
		return "audio/mp4"
	case "opus":
		return "audio/opus"
	default:
		return "application/octet-stream"
	}
}

func (s *Storage) GetFileURL(downloadID, ext string) string {
	return s.baseURL + "/storage/" + downloadID + "." + ext
}

func (s *Storage) GetFileInfo(downloadID, ext string) (size int64, modTime time.Time, exists bool) {
	filePath := filepath.Join(s.storagePath, downloadID+"."+ext)
	info, err := os.Stat(filePath)
	if err != nil {
		return 0, time.Time{}, false
	}
	return info.Size(), info.ModTime(), true
}