import { VideoPlayerCard } from "@/shared/components/VideoPlayerCard";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import instructionsVideo from "../assets/videos/instrucciones.mp4";

export default function Instructions() {
  return (
    <ModulePageLayout title="Tentaciones">
      <VideoPlayerCard
        src={instructionsVideo}
        nextRoute="/modulos/tentaciones/instrucciones"
        showControls={true}
      />
    </ModulePageLayout>
  );
}
