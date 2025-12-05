import { VideoPlayerCard } from "@/shared/components/VideoPlayerCard";
import instructionsVideo from "../assets/videos/instrucciones.mp4";

export default function Instructions() {
  return (
    <div className="flex flex-col min-h-screen px-4">
      {/* Header with Ribbon */}
      <div className="flex justify-center">
        <div className="ribbon">
          <div className="content">Yo Me Aseguro</div>
        </div>
      </div>

      <VideoPlayerCard
        src={instructionsVideo}
        nextRoute="/modulos/yo-me-aseguro/instrucciones"
        showControls={true}
      />
    </div>
  );
}
