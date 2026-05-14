import { Container, ContainerContent } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ApiRequest } from "@/lib/api/types";
import { useFFmpegStore } from "@/store/useFfmpegStore";
import { useQueueStore, type QueueOptions } from "@/store/useQueueStore";
import { useSettingStore } from "@/store/useSettingStore";
import { AudioWaveform, Sparkles, Video } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const DownloadSection = () => {
  const [mode, setMode] = useState<"video" | "audio">("video");
  const [url, setUrl] = useState("");
  const { settingsValues } = useSettingStore();
  const { currentJob, jobsProgress } = useFFmpegStore();
  const { addQueue, setProgressFromQueue } = useQueueStore();

  const handleAdd = () => {
    const urlRegex =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    const validate = urlRegex.test(url);

    if (!validate) {
      toast.error("URL is not valid!", {
        description: "Please enter valid url",
      });
      return;
    }

    const requestOpts: ApiRequest = {
      url,
      mode,
      option: {
        preferredResolution: settingsValues[
          "preferred-video-quality"
        ] as string,
      },
    };
    let queueOpts: QueueOptions;

    if (mode === "video") {
      const videoCodec = settingsValues["video-codec"] as string;
      const videoContainer = settingsValues["video-container"] as string;

      queueOpts = {
        videoCodec,
        videoContainer,
      };
    } else {
      const audioContainer = settingsValues["audio-container"] as string;
      const encodeAudio = settingsValues["encode-audio"] as boolean;

      queueOpts = {
        audioContainer,
        encodeAudio,
      };
    }

    addQueue(requestOpts, queueOpts);

    toast.success("URL added to your queue");
    setUrl("");
  };

  useEffect(() => {
    if (currentJob) {
      setProgressFromQueue(currentJob.queueID, currentJob.processID, {
        progress: jobsProgress,
      });
    }
  }, [currentJob, jobsProgress, setProgressFromQueue]);

  return (
    <Container className="flex-1">
      <ContainerContent className="flex items-center justify-center h-dvh flex-col gap-4">
        <div className="text-3xl md:text-3xl font-medium">
          save media easily
        </div>

        <Field orientation="vertical" className="max-w-150">
          <InputGroup>
            <InputGroupAddon>
              <Sparkles />
            </InputGroupAddon>
            <InputGroupInput
              onChange={(e) => setUrl(e.target.value)}
              value={url}
              placeholder="Paste the media URL here, eg Youtube, Twitter, etc."
            />
          </InputGroup>

          <Field orientation="horizontal">
            <Select
              defaultValue={mode}
              onValueChange={(value: "video" | "audio") => setMode(value)}
            >
              <SelectTrigger className="w-fit!">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="video">
                    <Video /> Video
                  </SelectItem>
                  <SelectItem value="audio">
                    <AudioWaveform /> Audio
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Button onClick={handleAdd} className="ml-auto">
              Add to Queue
            </Button>
          </Field>
        </Field>

        <div className="text-muted-foreground text-sm">
          grips powered by yt-dlp
        </div>
      </ContainerContent>
    </Container>
  );
};

export default DownloadSection;
