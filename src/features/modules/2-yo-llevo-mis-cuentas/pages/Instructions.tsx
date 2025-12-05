import { VideoPlayerCard } from "@/shared/components/VideoPlayerCard";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import instructionsVideo from "../assets/videos/instrucciones.mp4";

export default function Instructions() {
  return (
    <ModulePageLayout title="Yo Llevo Mis Cuentas">
      <VideoPlayerCard
        src={instructionsVideo}
        nextRoute="/modulos/yo-llevo-mis-cuentas/instrucciones"
        showControls={true}
      />
    </ModulePageLayout>
  );
}
