import { VideoPlayerCard } from "@/shared/components/VideoPlayerCard";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import introVideo from "../assets/videos/intro.mp4";

export default function Intro() {
  return (
    <ModulePageLayout title="Trabajo en Comunidad">
      <VideoPlayerCard
        src={introVideo}
        nextRoute="/modulos/trabajo-en-comunidad"
        showControls={true}
      />
    </ModulePageLayout>
  );
}
