import { VideoPlayerCard } from "@/shared/components/VideoPlayerCard";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import introVideo from "../assets/videos/intro.mp4";

export default function Intro() {
  return (
    <ModulePageLayout title="Yo llevo mis cuentas">
      <VideoPlayerCard
        src={introVideo}
        nextRoute="/modulos/yo-llevo-mis-cuentas/instrucciones"
        showControls={true}
      />
    </ModulePageLayout>
  );
}
