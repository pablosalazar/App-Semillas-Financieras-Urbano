import { VideoPlayerCard } from "@/shared/components/VideoPlayerCard";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import introVideo from "../assets/videos/intro.mp4";

export default function Intro() {
  return (
    <ModulePageLayout title="Yo me aseguro">
      <VideoPlayerCard
        src={introVideo}
        nextRoute="/modulos/yo-me-aseguro/instrucciones"
        showControls={true}
      />
    </ModulePageLayout>
  );
}
