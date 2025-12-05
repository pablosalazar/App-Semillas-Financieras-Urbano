import { VideoPlayerCard } from "@/shared/components/VideoPlayerCard";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import introVideo from "../assets/videos/intro.mp4";

export default function Intro() {
  return (
    <ModulePageLayout title="Recomendaciones de Seguridad">
      <VideoPlayerCard
        src={introVideo}
        nextRoute="/modulos/recomendaciones-de-seguridad"
        showControls={true}
      />
    </ModulePageLayout>
  );
}
