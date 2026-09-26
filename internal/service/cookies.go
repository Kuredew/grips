package service

import (
	"encoding/base64"
	"os"
)

type Cookies struct {
	CookiesPath string
}

func NewCookies(cookiesUrl string, reader *Reader) (*Cookies, error) {
	cookiesBase64, err := reader.FromUrl(cookiesUrl)
	if err != nil {
		return nil, err
	}

	input, err := base64.StdEncoding.DecodeString(cookiesBase64)
	if err != nil {
		return nil, err
	}

	tmpFile, err := os.CreateTemp("", "yt-cookies-*.txt")
	if err != nil {
		return nil, err
	}

	_, err = tmpFile.Write(input)
	if err != nil {
		return nil, err
	}

	return &Cookies{
		CookiesPath: tmpFile.Name(),
	}, nil
}
