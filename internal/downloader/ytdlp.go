package downloader

import (
	"bufio"
	"os/exec"
	"strings"

	"github.com/sirupsen/logrus"
)

type YtdlpDownloader struct {
	Log        *logrus.Logger
	BinaryPath string
}

type URLInfo struct {
	Title        string
	ExtractedURL []string
}

func (ytdlp *YtdlpDownloader) GetTitle(url string) (URLInfo, error) {
	var urlInfo URLInfo

	ytdlp.Log.Info("Started.")

	out, err := exec.Command(ytdlp.BinaryPath, "--get-title", url).Output()
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

func (ytdlp *YtdlpDownloader) ExtractVideoUrls(url string, logChan chan<- string) (URLInfo, error) {
	var urlInfo URLInfo

	cmd := exec.Command(ytdlp.BinaryPath, "--verbose", "-g", "--cookies-from-browser", "firefox", "--js-runtimes", "node", url)
	var urls []string

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

			if strings.HasPrefix(m, "https") {
				urls = append(urls, m)
				ytdlp.Log.Info("Appended URL from stdout")
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
	urlInfo = URLInfo{
		ExtractedURL: urls,
	}
	return urlInfo, nil
}
