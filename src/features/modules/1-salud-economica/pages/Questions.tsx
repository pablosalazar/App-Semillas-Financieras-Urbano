import { useState } from "react";
import { SurveyQuestionGrid } from "../components/SurveyQuestionGrid";
import { QUESTIONS } from "../constants/questions";
import { ProgressBar } from "@/shared/components/ProgressBar";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import { useNavigate } from "react-router";
import { useAuthenticatedUser } from "@/context/AuthContext";
import { useRegisterProgress } from "../../hooks/useRegisterProgress";
import { Loader } from "@/shared/components/ui/loader/Loader";
import { useSaludEconomica } from "../context/SaludEconomicaContext";
import { SALUD_ECONOMICA_PATHS } from "../constants/paths";

export default function Questions() {
  const navigate = useNavigate();
  const user = useAuthenticatedUser();
  const { mutate: registerProgress, isPending } = useRegisterProgress();
  const { setScore } = useSaludEconomica();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scoreSum, setScoreSum] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === QUESTIONS.length - 1;

  const handleContinue = (selectedValue: number) => {
    // Add the answer value to the sum
    const newSum = scoreSum + selectedValue;
    setScoreSum(newSum);

    if (isLastQuestion) {
      // Calculate average score: sum of all answers divided by number of questions
      const score = newSum / QUESTIONS.length;

      // Store score in context
      setScore(score);

      // Register progress with only the score
      registerProgress(
        {
          userId: user.id,
          moduleProgress: {
            moduleId: "salud-economica",
            isComplete: true,
            progress: 100,
            data: {
              score,
            },
          },
        },
        {
          onSuccess: () => {
            navigate(SALUD_ECONOMICA_PATHS.FEEDBACK);
          },
          onError: (error) => {
            console.error("Error al guardar progreso:", error);
          },
        }
      );
    } else {
      // Fade out, then move to next question
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  return (
    <ModulePageLayout title="Salud Económica">
      {isPending && <Loader message="Guardando progreso..." />}
      <div className="space-y-6">
        {/* Progress Bar */}
        <ProgressBar
          current={currentQuestionIndex + 1}
          total={QUESTIONS.length}
          showText={true}
          label="Pregunta"
          className="max-w-3xl mx-auto mb-6"
        />

        <div className="max-w-3xl mx-auto w-full flex-1">
          <div
            className={`module-card ${
              isAnimating ? "opacity-0" : "opacity-100"
            }`}
          >
            <SurveyQuestionGrid
              question={currentQuestion.question}
              options={currentQuestion.options}
              onContinue={handleContinue}
              isLastQuestion={isLastQuestion}
            />
          </div>
        </div>
      </div>
    </ModulePageLayout>
  );
}
