package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"grips/internal/handler"
	"grips/internal/middleware"
	"grips/internal/service"
)

func main() {
	storagePath := getEnv("STORAGE_PATH", "./storage")
	tmpPath := getEnv("TMP_PATH", "./tmp")
	port := getEnv("PORT", "8080")
	baseURL := getEnv("BASE_URL", "http://localhost:8080")
	ytDlpBinary := getEnv("YT_DLP_BINARY", "yt-dlp")
	ytDlpTimeout := getEnvDuration("YT_DLP_TIMEOUT", 5*time.Minute)
	maxConcurrent := getEnvInt("MAX_CONCURRENT", 3)

	if err := os.MkdirAll(storagePath, 0755); err != nil {
		log.Fatalf("Failed to create storage dir: %v", err)
	}
	if err := os.MkdirAll(tmpPath, 0755); err != nil {
		log.Fatalf("Failed to create tmp dir: %v", err)
	}

	ytdlp := service.NewYTDLP(ytDlpBinary, ytDlpTimeout)
	downloader := service.NewDownloader(ytdlp, storagePath, tmpPath, maxConcurrent)
	storage := service.NewStorage(storagePath, baseURL)

	infoHandler := handler.NewInfoHandler(ytdlp)
	downloadHandler := handler.NewDownloadHandler(downloader, storage)
	streamHandler := handler.NewStreamHandler(downloader, storage)

	rateLimiter := middleware.NewRateLimiter(5.0/60.0, 10, 10*time.Minute)
	infoRateLimiter := middleware.NewRateLimiter(30.0/60.0, 50, 10*time.Minute)

	mux := http.NewServeMux()

	mux.Handle("/info", middleware.LoggingMiddleware(infoRateLimiter.Middleware(infoHandler)))
	mux.Handle("/download/", middleware.LoggingMiddleware(rateLimiter.Middleware(downloadHandler)))
	mux.Handle("/stream/", middleware.LoggingMiddleware(streamHandler))
	mux.Handle("/storage/", middleware.LoggingMiddleware(http.StripPrefix("/storage/", http.FileServer(http.Dir(storagePath)))))

	mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	})

	server := &http.Server{
		Addr:         ":" + port,
		Handler:      mux,
		ReadTimeout:  30 * time.Second,
		WriteTimeout: 10 * time.Minute,
		IdleTimeout:  120 * time.Second,
	}

	go func() {
		log.Printf("Server starting on port %s", port)
		log.Printf("Storage: %s", storagePath)
		log.Printf("Temp: %s", tmpPath)
		log.Printf("Max concurrent downloads: %d", maxConcurrent)
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Server failed: %v", err)
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Println("Shutting down server...")
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	if err := server.Shutdown(ctx); err != nil {
		log.Fatalf("Server forced to shutdown: %v", err)
	}

	log.Println("Server exited")
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

func getEnvDuration(key string, defaultValue time.Duration) time.Duration {
	if value := os.Getenv(key); value != "" {
		if d, err := time.ParseDuration(value); err == nil {
			return d
		}
	}
	return defaultValue
}

func getEnvInt(key string, defaultValue int) int {
	if value := os.Getenv(key); value != "" {
		var result int
		if _, err := fmt.Sscanf(value, "%d", &result); err == nil {
			return result
		}
	}
	return defaultValue
}

