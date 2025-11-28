import { VideoPlayerCard } from "@/shared/components/VideoPlayerCard";
import introVideo from "@/assets/videos/9-cajero-automático/Interfaz_Cajero_Tutorial.m4v";

export default function IntroPage() {
  return (
    <div className="flex flex-col min-h-screen px-4">
      {/* Header with Ribbon */}
      <div className="flex justify-center">
        <div className="ribbon ribbon-orange">
          <div className="content">Cajero Automático</div>
        </div>
      </div>

      <VideoPlayerCard
        src={introVideo}
        nextRoute="/modulos/cajero-automatico/inicio"
        showControls={true}
      />
    </div>
  );
}
