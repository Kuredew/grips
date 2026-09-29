FROM golang:1.27.1-bookworm AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-w -s" -o main .

#==========================
    
FROM alpine:3.24.2

WORKDIR /app

RUN apk add --no-cache \
    ffmpeg \
    ca-certificates \
    curl \
    gcompat \
    libstdc++

RUN curl -L https://github.com/denoland/deno/releases/latest/download/deno-x86_64-unknown-linux-gnu.zip -o deno.zip \
    && unzip deno.zip -d /usr/local/bin \
    && rm deno.zip \
    && chmod +x /usr/local/bin/deno

RUN curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp_musllinux -o /usr/local/bin/yt-dlp \
    && chmod +x /usr/local/bin/yt-dlp

# Install Brainicism/bgutil-ytdlp-pot-provider plugin
RUN curl -L https://github.com/Brainicism/bgutil-ytdlp-pot-provider/releases/download/2.0.0/bgutil-ytdlp-pot-provider.zip \
    && unzip bgutil-ytdlp-pot-provider.zip -d /etc/yt-dlp-plugins/bgutil-ytdlp-pot-provider \
    && rm bgutil-ytdlp-pot-provider.zip


COPY --from=builder /app/main .

EXPOSE 8080

CMD ["./main"]
