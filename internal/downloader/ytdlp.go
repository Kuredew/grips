package downloader

import (
	"bufio"
	"encoding/json"
	"fmt"
	"os/exec"
	"strings"

	"github.com/sirupsen/logrus"
)

type YtdlpDownloader struct {
	Log        *logrus.Logger
	PythonPath string
}

type ModeOptions struct {
	PreferredResolution string
}

type Options struct {
	URL    string
	Mode   string
	Option ModeOptions
}

func (o *Options) IsValid() bool {
	return o.URL != "" && o.Mode != "" && o.Option != ModeOptions{}
}

type URLInfo struct {
	Title string `json:"title"`
	URL   string `json:"url"`
}

func (ytdlp *YtdlpDownloader) GetTitle(url string) (URLInfo, error) {
	var urlInfo URLInfo

	ytdlp.Log.Info("Started.")

	out, err := exec.Command("python3", "-m", "yt-dlp", "--get-title", url).Output()
	if err != nil {
		return urlInfo, err
	}

	// remove newline
	title := strings.TrimSpace(string(out))

	urlInfo = URLInfo{
		Title: title,
	}
	ytdlp.Log.Info("Got title")
	return urlInfo, nil
}

func (ytdlp *YtdlpDownloader) Extract(options Options, logChan chan<- string) ([]URLInfo, error) {
	var urlInfo []URLInfo
	var finalJsonString string
	args := []string{"-m", "yt_dlp", "--verbose", "--no-playlist", "--print", `{"title": "%(title)s", "url": "%(urls)s" }`, "--cookies-from-browser", "firefox", "--js-runtimes", "node"}

	switch options.Mode {
	case "video":
		args = append(args, "-S", fmt.Sprintf("res:%v", options.Option.PreferredResolution))
	case "audio":
		args = append(args, "-f", "ba")
	default:
		errorStr := fmt.Errorf("Uncompatible mode : %v", options.Mode)
		ytdlp.Log.Error(errorStr)
		return urlInfo, errorStr
	}

	args = append(args, options.URL)
	cmd := exec.Command(ytdlp.PythonPath, args...)

	defer close(logChan)

	ytdlp.Log.Info("Start extract.")

	stdout, err := cmd.StdoutPipe()
	if err != nil {
		ytdlp.Log.Error(err)
		return urlInfo, err
	}

	stderr, err := cmd.StderrPipe()
	if err != nil {
		ytdlp.Log.Error(err)
		return urlInfo, err
	}

	if err := cmd.Start(); err != nil {
		ytdlp.Log.Error(err)
		return urlInfo, err
	}

	go func() {
		scanner := bufio.NewScanner(stdout)
		for scanner.Scan() {
			m := scanner.Text()
			ytdlp.Log.Info(m)
			logChan <- m

			if strings.HasPrefix(m, "{") {
				finalJsonString += m
				ytdlp.Log.Info("Appended string that have prefix '{'")
			}
			if strings.HasPrefix(m, "https") {
				finalJsonString += fmt.Sprintf(" | %v", m)
				ytdlp.Log.Info("Appended string that have prefix 'https'")
			}
		}
	}()

	go func() {
		scanner := bufio.NewScanner(stderr)
		for scanner.Scan() {
			m := scanner.Text()
			ytdlp.Log.Warn(m)
			logChan <- m
		}
	}()

	if err := cmd.Wait(); err != nil {
		ytdlp.Log.Error(err)
		return urlInfo, err
	}
	ytdlp.Log.Info("Extract complete.")

	// fix if ytdlp return playlist
	fixedJsonString := strings.ReplaceAll(finalJsonString, "}{", "},{")

	ytdlp.Log.Infof("Unmarshalling json string from : \n%v", fixedJsonString)
	if err := json.Unmarshal(fmt.Appendf(nil, "[%v]", fixedJsonString), &urlInfo); err != nil {
		ytdlp.Log.Errorf("Error unmarshalling json : %v", err)
		return urlInfo, err
	}
	ytdlp.Log.Info("Operation completed.")
	return urlInfo, nil
}
