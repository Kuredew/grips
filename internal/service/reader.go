package service

import (
	"errors"
	"io"
	"net/http"
)

type Reader struct{}

func NewReader() *Reader {
	return &Reader{}
}

func (r *Reader) FromUrl(url string) (string, error) {
	resp, err := http.Get(url)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return "", errors.New("HTTPResponse is not OK")
	}

	bodyBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	bodyString := string(bodyBytes)
	return bodyString, nil
}
