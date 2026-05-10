import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Progress } from "@/components/ui/progress";
import { useQueueStore } from "@/store/useQueueStore";
import { AudioWaveformIcon, FileIcon, VideoIcon } from "lucide-react";
import type { PropsWithChildren } from "react";

const EmptyQueue = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia>
          <FileIcon />
        </EmptyMedia>
        <EmptyTitle>No Queue</EmptyTitle>
        <EmptyDescription>No URL added to your queue list</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
};

// const Mock: Partial<Queue>[] = [
//   {
//     id: "",
//     data: {
//       name: "dawg",
//     },
//     message: "Downloading Buffer (2 buffer/s)",
//     progressList: [
//       {
//         id: "",
//         message: "Downloading Buffer (1/2)",
//         progress: 50,
//       },
//       {
//         id: "",
//         message: "Downloading Buffer (2/2)",
//         progress: 30,
//       },
//     ],
//   },
// ];

const QueueModal = ({ children }: PropsWithChildren) => {
  const { queues } = useQueueStore();

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Queues</DialogTitle>
          <DialogDescription>
            The following is a list of download tasks.
          </DialogDescription>
        </DialogHeader>

        <ItemGroup>
          {queues.length > 0 ? (
            queues.map((q, i) => (
              <Item
                variant={q.status === "failed" ? "muted" : "default"}
                key={i}
              >
                <ItemMedia>
                  {q.mode === "video" ? <VideoIcon /> : <AudioWaveformIcon />}
                </ItemMedia>

                <ItemContent>
                  <ItemTitle>{q.data.name}</ItemTitle>

                  <ItemDescription className="gap-2 flex flex-col">
                    {q.progressList.length > 0 ? (
                      q.progressList.map((progress) => (
                        <Field>
                          <FieldLabel>
                            <span>{progress.message}</span>
                            <span className="ml-auto">
                              {progress.progress}%
                            </span>
                          </FieldLabel>
                          <Progress value={progress.progress} />
                        </Field>
                      ))
                    ) : (
                      <Field>
                        <FieldLabel>
                          <span>{q.message}</span>
                        </FieldLabel>
                      </Field>
                    )}
                  </ItemDescription>
                </ItemContent>
              </Item>
            ))
          ) : (
            <EmptyQueue />
          )}
        </ItemGroup>
      </DialogContent>
    </Dialog>
  );
};

export default QueueModal;
