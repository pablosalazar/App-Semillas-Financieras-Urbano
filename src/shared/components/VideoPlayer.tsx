import { useRef } from "react";
import { useNavigate } from "react-router";
import arrowForwardImg from "@/assets/images/controls/arrow-forward.png";
import replayImg from "@/assets/images/controls/replay.png";

interface VideoPlayerProps {
  /** Video source URL */
  src: string;
  /** Route to navigate to when video ends or forward button is clicked */
  nextRoute: string;
  /** Optional: Show controls (play/pause, timeline, volume) */
  showControls?: boolean;
}

export function VideoPlayer({
  src,
  nextRoute,
  showControls = false,
}: VideoPlayerProps) {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const handleForward = () => {
    navigate(nextRoute);
  };

  return (
    <div className="fixed inset-0 w-screen h-screen flex items-center justify-center z-50">
      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        controls={showControls}
        className="max-w-full max-h-full object-contain"
        autoPlay
      >
        Your browser does not support the video tag.
      </video>

      {/* Control Buttons - Bottom Right */}
      <div className="absolute bottom-6 right-6 flex gap-8">
        {/* Replay Button */}
        <button
          onClick={handleReplay}
          className="bg-white hover:bg-white rounded-full p-2 shadow-lg hover:scale-110 transition-all border-2 border-(--blue) cursor-pointer"
          aria-label="Replay video"
        >
          <img src={replayImg} alt="Replay" className="w-12 h-12" />
        </button>

        {/* Forward Button - Always visible for skipping */}
        <button
          onClick={handleForward}
          className="bg-orange-500 hover:bg-orange-600 rounded-full p-2 shadow-lg hover:scale-110 transition-all border-2 border-orange-500 cursor-pointer"
          aria-label="Skip video"
        >
          <img src={arrowForwardImg} alt="Skip" className="w-12 h-12" />
        </button>
      </div>
    </div>
  );
}
