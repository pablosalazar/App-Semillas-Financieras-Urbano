import { VideoPlayerCard } from "@/shared/components/VideoPlayerCard";
import instructionsVideo from "../assets/videos/instrucciones.mp4";

export default function Instructions() {
  return (
    <div className="flex flex-col min-h-screen px-4">
      {/* Header with Ribbon */}
      <div className="flex justify-center">
        <div className="ribbon">
          <div className="content">Servicios Financieros</div>
        </div>
      </div>

      <VideoPlayerCard
        src={instructionsVideo}
        nextRoute="/modulos/servicios-financieros/instrucciones"
        showControls={true}
      />
    </div>
  );
}
