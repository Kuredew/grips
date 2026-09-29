package service

import (
	"bufio"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"os"
	"os/exec"
	"strings"
	"sync"
	"time"

	"grips/internal/model"
)

type YTDLP struct {
	binaryPath        string
	timeout           time.Duration
	cookies           *Cookies
	requiredArguments []string
}

type VideoInfoRaw struct {
	ID          string  `json:"id"`
	Title       string  `json:"title"`
	Description string  `json:"description"`
	Duration    float64 `json:"duration"`
	Thumbnail   string  `json:"thumbnail"`
	Uploader    string  `json:"uploader"`
	ViewCount   int64   `json:"view_count"`
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

func NewYTDLP(cookies *Cookies, bgutilBaseUrl string, binaryPath string, timeout time.Duration) *YTDLP {
	if binaryPath == "" {
		binaryPath = "yt-dlp"
	}
	if timeout == 0 {
		timeout = 5 * time.Minute
	}
	return &YTDLP{
		binaryPath: binaryPath,
		timeout:    timeout,
		cookies:    cookies,
		requiredArguments: []string{
			"--cookies", cookies.CookiesPath,
			"--extractor-args", "youtube:player_client=web_creator",
			"--extractor-args", "youtubepot-bgutilhttp:base_url=" + bgutilBaseUrl,
			"--js-runtimes", "node",
		},
	}
}

func (y *YTDLP) GetInfo(ctx context.Context, url string) (*model.VideoInfo, error) {
	ctx, cancel := context.WithTimeout(ctx, y.timeout)
	defer cancel()

	args := []string{
		"--dump-json",
		"--no-playlist",
		"--quiet",
		"--no-warnings",
	}

	args = append(args, y.requiredArguments...)
	args = append(args, url)

	fmt.Printf("running yt-dlp with arguments: %s\n", args)

	cmd := exec.CommandContext(ctx, y.binaryPath, args...)
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

func (y *YTDLP) Download(ctx context.Context, url, format, quality, fileName string, outputDir string, audioOnly bool, progressChan chan<- model.ProgressEventData) (string, error) {
	ctx, cancel := context.WithTimeout(ctx, y.timeout)
	defer cancel()

	args := []string{
		"--no-playlist",
		"--newline",
		"--progress",
		"--path", outputDir,
		"--output", fileName + ".%(ext)s",
		"--print", "after_move:filepath",
	}

	if audioOnly {
		args = append(args, "-x", "--audio-format", "mp3", "--audio-quality", "0")
	} else if format != "" {
		args = append(args, "-f", format)
	} else if quality != "" {
		formatSpec := y.qualityToFormat(quality)
		args = append(args, "-f", formatSpec)
	}

	args = append(args, y.requiredArguments...)
	args = append(args, url)

	cmd := exec.CommandContext(ctx, y.binaryPath, args...)

	stdout, err := cmd.StdoutPipe()
	if err != nil {
		return "", fmt.Errorf("stdout pipe failed: %w", err)
	}
	stderr, err := cmd.StderrPipe()
	if err != nil {
		return "", fmt.Errorf("stderr pipe failed: %w", err)
	}

	if err := cmd.Start(); err != nil {
		return "", fmt.Errorf("yt-dlp start failed: %w", err)
	}

	var mu sync.Mutex
	var wg sync.WaitGroup

	filePath := ""

	wg.Add(2)
	go func() {
		y.readProgress(stdout, progressChan, &filePath, &mu)
		wg.Done()
	}()
	go func() {
		y.readProgress(stderr, progressChan, &filePath, &mu)
		wg.Done()
	}()

	if err := cmd.Wait(); err != nil {
		return "", fmt.Errorf("yt-dlp download failed: %w", err)
	}

	wg.Wait()

	return filePath, nil
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

func (y *YTDLP) readProgress(reader io.Reader, progressChan chan<- model.ProgressEventData, filePath *string, mu *sync.Mutex) {
	scanner := bufio.NewScanner(reader)

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())

		progressChan <- model.ProgressEventData{
			Log: line,
		}

		if _, err := os.Stat(line); err == nil {
			mu.Lock()
			*filePath = line
			mu.Unlock()
		}
	}
}
