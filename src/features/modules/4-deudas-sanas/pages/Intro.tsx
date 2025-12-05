import { VideoPlayerCard } from "@/shared/components/VideoPlayerCard";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import introVideo from "../assets/videos/intro.mp4";

export default function Intro() {
  return (
    <ModulePageLayout title="Deudas Sanas">
      <VideoPlayerCard
        src={introVideo}
        nextRoute="/modulos/deudas-sanas/instrucciones"
        showControls={true}
      />
    </ModulePageLayout>
  );
}
