package downloader

import (
	"io"
	"net/http"
)

func (ytdlp *YtdlpDownloader) ReadTextFromURL(url string) (string, error) {
	resp, err := http.Get(url)
	if err != nil {
		ytdlp.Log.Fatalf("Error accessing URL: %v", err)
		return "", err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		ytdlp.Log.Fatalf("Status error: %d %s", resp.StatusCode, resp.Status)
	}

	bodyBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		ytdlp.Log.Fatalf("Failed to read response: %v", err)
		return "", err
	}

	bodyString := string(bodyBytes)
	
	return bodyString, nil
}