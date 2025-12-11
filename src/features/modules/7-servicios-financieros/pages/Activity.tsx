import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import { ProgressBar } from "@/shared/components/ProgressBar";
import { MATCHING_TERMS } from "../constants/matching-terms";
import { SERVICIOS_FINANCIEROS_PATHS } from "../constants/paths";
import successSound from "@/assets/sounds/success.ogg";
import failSound from "@/assets/sounds/fail.mp3";
import "./Activity.css";

interface MatchingTerm {
  id: string;
  category: string;
  term: string;
  description: string;
}

export default function Activity() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [availableTerms, setAvailableTerms] = useState<MatchingTerm[]>([]);
  const [shuffledTerms, setShuffledTerms] = useState<MatchingTerm[]>([]);
  const [draggedTerm, setDraggedTerm] = useState<string | null>(null);
  const [isDropZoneActive, setIsDropZoneActive] = useState(false);
  const [showFeedback, setShowFeedback] = useState<"success" | "error" | null>(
    null
  );

  // Audio instances
  const [successAudio] = useState(new Audio(successSound));
  const [failAudio] = useState(new Audio(failSound));

  // Initialize the activity
  useEffect(() => {
    const shuffledQuestions = [...MATCHING_TERMS].sort(
      () => Math.random() - 0.5
    );
    const shuffledOptions = [...MATCHING_TERMS].sort(() => Math.random() - 0.5);
    setShuffledTerms(shuffledQuestions);
    setAvailableTerms(shuffledOptions);
  }, []);

  const currentQuestion = shuffledTerms[currentIndex];

  const handleDragStart = (termId: string) => {
    setDraggedTerm(termId);
  };

  const handleDragEnd = () => {
    setDraggedTerm(null);
    setIsDropZoneActive(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDropZoneActive(true);
  };

  const handleDragLeave = () => {
    setIsDropZoneActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDropZoneActive(false);

    if (!draggedTerm || !currentQuestion) return;

    const isCorrect = draggedTerm === currentQuestion.id;

    if (isCorrect) {
      setShowFeedback("success");
      successAudio.play();

      // Remove the matched term from available terms
      setAvailableTerms((prev) => prev.filter((t) => t.id !== draggedTerm));

      setTimeout(() => {
        setShowFeedback(null);

        if (currentIndex < shuffledTerms.length - 1) {
          setCurrentIndex(currentIndex + 1);
        } else {
          // Navigate to feedback page after completing all questions
          navigate(SERVICIOS_FINANCIEROS_PATHS.FEEDBACK);
        }
      }, 1500);
    } else {
      setShowFeedback("error");
      failAudio.play();

      setTimeout(() => {
        setShowFeedback(null);
      }, 1500);
    }

    setDraggedTerm(null);
  };

  if (!currentQuestion) {
    return (
      <ModulePageLayout title="Servicios Financieros">
        <div className="activity-loading">Cargando actividad...</div>
      </ModulePageLayout>
    );
  }

  return (
    <ModulePageLayout title="Servicios Financieros">
      <div className="activity-container-compact">
        {/* Progress Bar */}
        <ProgressBar
          current={currentIndex + 1}
          total={shuffledTerms.length}
          showText={true}
          label="Pregunta"
          className="max-w-3xl mx-auto mb-6"
        />

        <div className="max-w-5xl mx-auto w-full flex-1">
          <div className="bg-white rounded-3xl shadow-xl p-8 border-3 border-(--blue)">
            {/* Drop Zone - Description Box */}
            <div
              className={`drop-zone-compact ${
                isDropZoneActive ? "active" : ""
              } ${showFeedback ? `feedback-${showFeedback}` : ""}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {showFeedback === "success" && (
                <div className="feedback-icon-compact success w-5xl text-center">
                  ✓
                </div>
              )}
              {showFeedback === "error" && (
                <div className="feedback-icon-compact error w-5xl text-center">
                  ✗
                </div>
              )}
              {!showFeedback && (
                <p className="drop-zone-text w-5xl">
                  {currentQuestion.description}
                </p>
              )}
            </div>

            {/* Draggable Terms Grid */}
            <div className="terms-grid-compact">
              {availableTerms.map((term) => (
                <div
                  key={term.id}
                  draggable
                  onDragStart={() => handleDragStart(term.id)}
                  onDragEnd={handleDragEnd}
                  className={`term-card-compact ${
                    draggedTerm === term.id ? "dragging" : ""
                  }`}
                >
                  {term.term}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ModulePageLayout>
  );
}
