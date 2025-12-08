import { useEffect, useRef } from "react";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import { YO_LLEVO_MIS_CUENTAS_PATHS } from "../constants/paths";
import { useNavigate } from "react-router";
import feedbackSound from "../assets/audio/feedback.ogg";

export default function Feedback() {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Play feedback sound when component mounts
  useEffect(() => {
    const audio = new Audio(feedbackSound);
    audioRef.current = audio;
    audio.play().catch((error) => {
      console.error("Error playing feedback sound:", error);
    });

    // Cleanup: pause and reset audio when component unmounts
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  return (
    <ModulePageLayout title="Yo llevo mis cuentas">
      <div className="space-y-6 mt-10">
        <div className="max-w-3xl mx-auto w-full flex-1">
          <div className="module-card">
            <div className="space-y-6">
              {/* Title with Emoji */}
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-5xl">🎉</span>
                </div>
                <h1 className="text-3xl font-bold text-(--blue) text-center">
                  ¡Felicitaciones!
                </h1>
              </div>

              {/* Message */}
              <div className="space-y-4">
                <div className="text-center space-y-4">
                  <p className="text-lg leading-relaxed text-gray-700 max-w-2xl mx-auto">
                    Recuerde registrar sus ingresos y gastos mensuales para
                    tomar mejores decisiones financieras.
                  </p>
                  <p className="text-lg leading-relaxed text-gray-700 max-w-2xl mx-auto">
                    ¡Esto le ayudará a cumplir su meta de ahorro!
                  </p>
                  <p className="text-lg leading-relaxed text-gray-700 max-w-2xl mx-auto">
                    ¡Continuemos aprendiendo con el siguiente módulo para que
                    mejore el manejo de sus finanzas!
                  </p>
                </div>
              </div>

              <div className="flex justify-center pt-6">
                <button
                  onClick={() => navigate(YO_LLEVO_MIS_CUENTAS_PATHS.REWARD)}
                  className="btn btn-orange text-xl px-8 py-3"
                >
                  Continuar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModulePageLayout>
  );
}
