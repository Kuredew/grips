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

func (ytdlp *YtdlpDownloader) GetTitle(url string) (string, error) {
	ytdlp.Log.Info("Started.")

	out, err := exec.Command(ytdlp.BinaryPath, "--get-title", url).Output()
	if err != nil {
		return "", err
	}

	// remove newline
	title := strings.TrimSpace(string(out))
	return title, nil
}

func (ytdlp *YtdlpDownloader) ExtractVideoUrls(url string) ([]string, error) {
	cmd := exec.Command(ytdlp.BinaryPath, "-g", "--cookies-from-browser", "firefox", "--js-runtimes", "node", url)
	var urls []string

	ytdlp.Log.Info("Start extract.")

	stdout, err := cmd.StdoutPipe()
	if err != nil {
		ytdlp.Log.Error(err)
		return nil, nil
	}

	stderr, err := cmd.StderrPipe()
	if err != nil {
		ytdlp.Log.Error(err)
		return nil, nil
	}

	if err := cmd.Start(); err != nil {
		ytdlp.Log.Error(err)
	}

	go func() {
		scanner := bufio.NewScanner(stdout)
		for scanner.Scan() {
			m := scanner.Text()
			ytdlp.Log.Info(m)

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
		}
	}()

	if err := cmd.Wait(); err != nil {
		ytdlp.Log.Error(err)
	}

	ytdlp.Log.Info("Extract complete.")
	return urls, nil
}
