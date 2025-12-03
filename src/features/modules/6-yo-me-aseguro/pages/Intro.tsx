import { VideoPlayerCard } from "@/shared/components/VideoPlayerCard";
import introVideo from "../assets/videos/intro.mp4";

export default function Intro() {
  return (
    <div className="flex flex-col min-h-screen px-4">
      {/* Header with Ribbon */}
      <div className="flex justify-center">
        <div className="ribbon ribbon-orange">
          <div className="content">Yo me aseguro</div>
        </div>
      </div>

      <VideoPlayerCard
        src={introVideo}
        nextRoute="/modulos/yo-me-aseguro"
        showControls={true}
      />
    </div>
  );
}
