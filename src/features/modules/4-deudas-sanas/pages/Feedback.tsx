import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import { VideoPlayerCard } from "@/shared/components/VideoPlayerCard";
import { DEUDAS_SANAS_PATHS } from "../constants/paths";
import feedbackVideo from "../assets/videos/feedback.mp4";

export default function Feedback() {
  return (
    <ModulePageLayout title="Deudas sanas">
      <VideoPlayerCard
        src={feedbackVideo}
        nextRoute={DEUDAS_SANAS_PATHS.REWARD}
        showControls={true}
        autoRedirect={false}
      />
    </ModulePageLayout>
  );
}
