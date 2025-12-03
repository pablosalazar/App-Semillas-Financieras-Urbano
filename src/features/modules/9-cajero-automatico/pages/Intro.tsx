import { VideoPlayerCard } from "@/shared/components/VideoPlayerCard";
import introVideo from "../assets/videos/intro.m4v";

export default function Intro() {
  return (
    <div className="flex flex-col min-h-screen px-4">
      {/* Header with Ribbon */}
      <div className="flex justify-center">
        <div className="ribbon">
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
