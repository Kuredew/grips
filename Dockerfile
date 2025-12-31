FROM golang:1.21-bullseye

# 1. install dependency
RUN apt-get update && apt-get install -y \
    curl \
    unzip \
    ffmpeg

# 2. install Deno 
RUN curl -L https://github.com/denoland/deno/releases/latest/download/deno-x86_64-unknown-linux-gnu.zip -o deno.zip \
    && unzip deno.zip \
    && chmod a+rx ./deno \
    && mv ./deno /usr/local/bin/deno \
    && rm deno.zip

# 3. install yt-dlp 
RUN curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp_linux -o ./yt-dlp \
    && chmod a+rx ./yt-dlp \
    && mv ./yt-dlp /usr/local/bin/yt-dlp

# set working directory
WORKDIR /app

# 4. copy & build grips backend
COPY . .
RUN go build -o out main.go

# expose grips backend port 
EXPOSE 8000

# finally run grips backend
CMD ["./out"]