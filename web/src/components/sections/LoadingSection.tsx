import { Container, ContainerContent } from "@/components/container";
import GripsLogo from "@/components/elements/GripsLogo";
import { Field, FieldLabel, FieldTitle } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";
import { formatBytes } from "@/lib/utils";
import { useFFmpegStore } from "@/store/useFfmpegStore";

const LoadingSection = () => {
  const { loadProgress, loadReceived } = useFFmpegStore();

  return (
    <Container>
      <ContainerContent className="h-dvh max-w-150 flex justify-center items-center">
        <Field>
          <FieldTitle>
            <GripsLogo />
          </FieldTitle>
          <FieldLabel>
            <span>
              getting grips ready, don't turn off your computer. (
              {formatBytes(loadReceived)})
            </span>
            <span className="ml-auto">{loadProgress}%</span>
          </FieldLabel>

          <Progress value={loadProgress} />
        </Field>
      </ContainerContent>
    </Container>
  );
};

export default LoadingSection;
