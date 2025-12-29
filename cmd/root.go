package cmd

import (
	"fmt"
	"net/http"
	"path"
	"runtime"
	"strings"

	"github.com/Kuredew/grips/api/handler"
	"github.com/Kuredew/grips/internal/downloader"
	"github.com/sirupsen/logrus"
)

var log = logrus.New()

func Init() {
	// set logger formatter
	log.SetFormatter(&logrus.TextFormatter{
		TimestampFormat: "2006-01-02T15:04:05.000Z",
		CallerPrettyfier: func(f *runtime.Frame) (string, string) {
			// Extract just the function name
			s := strings.Split(f.Function, ".")
			funcname := s[len(s)-1]

			_, filename := path.Split(f.File)

			return fmt.Sprintf("[%v]", funcname), filename
		},
		FullTimestamp: true,
		ForceColors:   true,
	})
	// set report caller
	log.SetReportCaller(true)

	ytdlp := downloader.YtdlpDownloader{
		Log:        log,
		BinaryPath: "yt-dlp",
	}

	h := handler.DownloadHandler{
		Log:    log,
		Worker: ytdlp,
	}

	log.Info("App Started.")

	// http.HandleFunc("/getinfo", h.HandleGetInfo)
	http.HandleFunc("/extract", h.HandleExtract)

	http.ListenAndServe(":8000", nil)
}
