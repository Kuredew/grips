package downloader

import (
	"bufio"
	"log"
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

func (ytdlp *YtdlpDownloader) ExtractVideoUrls(url string) ([]string, error) {
	cmd := exec.Command(ytdlp.BinaryPath, "-g", "--cookies-from-browser", "firefox", "--js-runtimes", "node", url)
	var urls []string

	log.Print("[extractvideo] Start extract.")

	stdout, err := cmd.StdoutPipe()
	if err != nil {
		log.Printf("[extractvideo/err] %v", err)
		return nil, nil
	}

	stderr, err := cmd.StderrPipe()
	if err != nil {
		log.Printf("[extractvideo/err] %v", err)
		return nil, nil
	}

	if err := cmd.Start(); err != nil {
		log.Printf("[extractvideo/err] %v", err)
	}

	go func() {
		scanner := bufio.NewScanner(stdout)
		for scanner.Scan() {
			m := scanner.Text()
			log.Printf("[extractvideo/stdout] %v\n", m)

			if strings.HasPrefix(m, "https") {
				urls = append(urls, m)
				log.Printf("[extractvideo] Appended url")
			}
		}
	}()

	go func() {
		scanner := bufio.NewScanner(stderr)
		for scanner.Scan() {
			m := scanner.Text()
			log.Printf("[extractvideo/stderr] %v\n", m)
		}
	}()

	if err := cmd.Wait(); err != nil {
		log.Printf("[extractvideo/err] %v", err)
	}

	log.Print("[extractvideo] Extract complete.")
	return urls, nil
}
