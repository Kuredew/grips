package downloader

import (
	"os/exec"
	"strings"
)

type YtdlpDownloader struct {
	BinaryPath string
}

func (ytdlp *YtdlpDownloader) GetTitle(url string) (string, error) {
	out, err := exec.Command(ytdlp.BinaryPath, "--get-title", url).Output()
	if err != nil {
		return "", err
	}

	// remove newline
	title := strings.TrimSpace(string(out))
	return title, nil
}
