package service

import (
	"context"
	"fmt"
	"os"
	"path/filepath"
	"time"

	"grips/internal/model"
)

type Downloader struct {
	ytdlp           *YTDLP
	storagePath     string
	tmpPath         string
	maxConcurrent   int
	sem             chan struct{}
	activeDownloads map[string]chan model.ProgressEventData
}

func NewDownloader(ytdlp *YTDLP, storagePath, tmpPath string, maxConcurrent int) *Downloader {
	if maxConcurrent <= 0 {
		maxConcurrent = 3
	}
	return &Downloader{
		ytdlp:           ytdlp,
		storagePath:     storagePath,
		tmpPath:         tmpPath,
		maxConcurrent:   maxConcurrent,
		sem:             make(chan struct{}, maxConcurrent),
		activeDownloads: make(map[string]chan model.ProgressEventData),
	}
}

func (d *Downloader) StartDownload(ctx context.Context, downloadID, url, format, quality string, audioOnly bool) (<-chan model.ProgressEventData, error) {
	select {
	case d.sem <- struct{}{}:
	case <-ctx.Done():
		return nil, fmt.Errorf("server busy, max concurrent downloads reached")
	}

	progressChan := make(chan model.ProgressEventData, 100)
	d.activeDownloads[downloadID] = progressChan

	go func() {
		defer func() {
			time.Sleep(5 * time.Second)

			<-d.sem
			delete(d.activeDownloads, downloadID)
			close(progressChan)
		}()

		ext := "mp4"
		if audioOnly {
			ext = "mp3"
		}
		tmpFile := filepath.Join(d.tmpPath, downloadID+"."+ext)
		finalFile := filepath.Join(d.storagePath, downloadID+"."+ext)

		err := d.ytdlp.Download(ctx, url, format, quality, tmpFile, audioOnly, progressChan)
		if err != nil {
			progressChan <- model.ProgressEventData{
				Log:   err.Error(),
				Error: true,
			}
			os.Remove(tmpFile)
			return
		}

		if err := os.Rename(tmpFile, finalFile); err != nil {
			progressChan <- model.ProgressEventData{
				Log:   "failed to move file: " + err.Error(),
				Error: true,
			}
			return
		}

		progressChan <- model.ProgressEventData{
			Error: false,
			Done:  true,
		}

		time.Sleep(100 * time.Second)
	}()

	return progressChan, nil
}

func (d *Downloader) GetProgressChannel(downloadID string) (chan model.ProgressEventData, bool) {
	ch, ok := d.activeDownloads[downloadID]
	return ch, ok
}

func (d *Downloader) GetFilePath(downloadID, ext string) string {
	return filepath.Join(d.storagePath, downloadID+"."+ext)
}

func (d *Downloader) FileExists(downloadID, ext string) bool {
	path := d.GetFilePath(downloadID, ext)
	_, err := os.Stat(path)
	return err == nil
}

func (d *Downloader) CleanupOldFiles(maxAge time.Duration) error {
	entries, err := os.ReadDir(d.storagePath)
	if err != nil {
		return err
	}

	now := time.Now()
	for _, entry := range entries {
		if entry.IsDir() {
			continue
		}
		info, err := entry.Info()
		if err != nil {
			continue
		}
		if now.Sub(info.ModTime()) > maxAge {
			os.Remove(filepath.Join(d.storagePath, entry.Name()))
		}
	}
	return nil
}
