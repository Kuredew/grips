package service

import (
	"bufio"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"os/exec"
	"strconv"
	"strings"
	"time"

	"grips/internal/model"
)

type YTDLP struct {
	binaryPath string
	timeout    time.Duration
}

type VideoInfoRaw struct {
	ID          string `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Duration    int    `json:"duration"`
	Thumbnail   string `json:"thumbnail"`
	Uploader    string `json:"uploader"`
	ViewCount   int64  `json:"view_count"`
	Formats     []struct {
		FormatID   string `json:"format_id"`
		Ext        string `json:"ext"`
		Resolution string `json:"resolution"`
		Filesize   int64  `json:"filesize"`
		VCodec     string `json:"vcodec"`
		ACodec     string `json:"acodec"`
		FormatNote string `json:"format_note"`
	} `json:"formats"`
}

func NewYTDLP(binaryPath string, timeout time.Duration) *YTDLP {
	if binaryPath == "" {
		binaryPath = "yt-dlp"
	}
	if timeout == 0 {
		timeout = 5 * time.Minute
	}
	return &YTDLP{
		binaryPath: binaryPath,
		timeout:    timeout,
	}
}

func (y *YTDLP) GetInfo(ctx context.Context, url string) (*model.VideoInfo, error) {
	ctx, cancel := context.WithTimeout(ctx, y.timeout)
	defer cancel()

	cmd := exec.CommandContext(ctx, y.binaryPath, "--dump-json", "--no-playlist", "--quiet", "--no-warnings", url)
	output, err := cmd.CombinedOutput()
	if err != nil {
		return nil, fmt.Errorf("yt-dlp get info failed: %w, output: %s", err, string(output))
	}

	var raw VideoInfoRaw
	if err := json.Unmarshal(output, &raw); err != nil {
		return nil, fmt.Errorf("failed to parse yt-dlp output: %w", err)
	}

	formats := make([]model.VideoFormat, len(raw.Formats))
	for i, f := range raw.Formats {
		formats[i] = model.VideoFormat{
			FormatID:   f.FormatID,
			Ext:        f.Ext,
			Resolution: f.Resolution,
			Filesize:   f.Filesize,
			VCodec:     f.VCodec,
			ACodec:     f.ACodec,
			Note:       f.FormatNote,
		}
	}

	return &model.VideoInfo{
		ID:          raw.ID,
		Title:       raw.Title,
		Description: raw.Description,
		Duration:    raw.Duration,
		Thumbnail:   raw.Thumbnail,
		Uploader:    raw.Uploader,
		ViewCount:   raw.ViewCount,
		Formats:     formats,
	}, nil
}

func (y *YTDLP) Download(ctx context.Context, url, format, quality, outputPath string, audioOnly bool, progressChan chan<- model.ProgressEventData) error {
	ctx, cancel := context.WithTimeout(ctx, y.timeout)
	defer cancel()

	args := []string{
		"--no-playlist",
		"--newline",
		"--progress-template", "download:%(progress._percent_str)s|%(progress._speed_str)s|%(progress._eta_str)s|%(progress._downloaded_bytes)s|%(progress._total_bytes)s",
		"-o", outputPath,
	}

	if audioOnly {
		args = append(args, "-x", "--audio-format", "mp3", "--audio-quality", "0")
	} else if format != "" {
		args = append(args, "-f", format)
	} else if quality != "" {
		formatSpec := y.qualityToFormat(quality)
		args = append(args, "-f", formatSpec)
	}

	args = append(args, url)

	cmd := exec.CommandContext(ctx, y.binaryPath, args...)

	stdout, err := cmd.StdoutPipe()
	if err != nil {
		return fmt.Errorf("stdout pipe failed: %w", err)
	}
	stderr, err := cmd.StderrPipe()
	if err != nil {
		return fmt.Errorf("stderr pipe failed: %w", err)
	}

	if err := cmd.Start(); err != nil {
		return fmt.Errorf("yt-dlp start failed: %w", err)
	}

	go y.readProgress(stdout, progressChan)
	go y.readProgress(stderr, progressChan)

	if err := cmd.Wait(); err != nil {
		return fmt.Errorf("yt-dlp download failed: %w", err)
	}

	progressChan <- model.ProgressEventData{
		Percent: 100,
		Speed:   "0",
		ETA:     "0",
	}

	return nil
}

func (y *YTDLP) qualityToFormat(quality string) string {
	switch strings.ToLower(quality) {
	case "best":
		return "bestvideo+bestaudio/best"
	case "worst":
		return "worstvideo+worstaudio/worst"
	case "1080p", "1080":
		return "bestvideo[height<=1080]+bestaudio/best[height<=1080]"
	case "720p", "720":
		return "bestvideo[height<=720]+bestaudio/best[height<=720]"
	case "480p", "480":
		return "bestvideo[height<=480]+bestaudio/best[height<=480]"
	case "360p", "360":
		return "bestvideo[height<=360]+bestaudio/best[height<=360]"
	default:
		return "bestvideo+bestaudio/best"
	}
}

func (y *YTDLP) readProgress(reader io.Reader, progressChan chan<- model.ProgressEventData) {
	scanner := bufio.NewScanner(reader)
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if !strings.HasPrefix(line, "download:") {
			continue
		}
		parts := strings.Split(strings.TrimPrefix(line, "download:"), "|")
		if len(parts) < 5 {
			continue
		}

		percentStr := strings.TrimSuffix(parts[0], "%")
		percent, _ := strconv.ParseFloat(percentStr, 64)

		downloaded, _ := strconv.ParseInt(parts[3], 10, 64)
		total, _ := strconv.ParseInt(parts[4], 10, 64)

		progressChan <- model.ProgressEventData{
			Percent:    percent,
			Speed:      parts[1],
			ETA:        parts[2],
			Downloaded: downloaded,
			Total:      total,
		}
	}
}
