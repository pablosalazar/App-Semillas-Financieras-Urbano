import { useState } from "react";
import { QuizQuestion } from "../components/QuizQuestion";
import { EVALUATION_INITIAL_QUESTIONS } from "../constants/questions";
import { ProgressBar } from "@/shared/components/ProgressBar";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import { Link } from "react-router";
import { ChevronRight } from "lucide-react";

export default function QuestionsPages() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<
    Record<string, { selected: string; isCorrect: boolean }>
  >({});
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = EVALUATION_INITIAL_QUESTIONS[currentQuestionIndex];
  const totalQuestions = EVALUATION_INITIAL_QUESTIONS.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const handleAnswerSubmit = (isCorrect: boolean, selectedAnswer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: { selected: selectedAnswer, isCorrect },
    }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setShowResults(true);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const calculateScore = () => {
    const correctAnswers = Object.values(answers).filter(
      (answer) => answer.isCorrect
    ).length;
    return {
      correct: correctAnswers,
      total: totalQuestions,
      percentage: Math.round((correctAnswers / totalQuestions) * 100),
    };
  };

  const score = calculateScore();
  const allQuestionsAnswered = Object.keys(answers).length === totalQuestions;

  return (
    <ModulePageLayout title="Evaluación Inicial">
      {!showResults && (
        <>
          {/* Progress Bar */}
          <ProgressBar
            current={currentQuestionIndex + 1}
            total={totalQuestions}
            showText={true}
            label="Pregunta"
            className="max-w-3xl mx-auto mb-6"
          />

          {/* Question Card */}
          <div className="max-w-3xl mx-auto w-full flex-1">
            <div className="bg-white rounded-3xl shadow-xl p-8 border-3 border-(--blue)">
              <QuizQuestion
                key={currentQuestion.id}
                question={currentQuestion.question}
                answers={currentQuestion.answers}
                correctAnswer={currentQuestion.correctAnswer}
                onAnswerSubmit={handleAnswerSubmit}
                onContinue={handleNext}
                isLastQuestion={isLastQuestion}
              />
            </div>
          </div>
        </>
      )}

      {/* Score Summary (shown when showing results) */}
      {showResults && allQuestionsAnswered && (
        <div className="max-w-3xl mx-auto w-full flex-1 flex items-center justify-center -mt-50">
          <div className="bg-linear-to-r from-blue-500 to-blue-600 rounded-3xl shadow-xl p-12 text-white text-center">
            <h3 className="text-4xl font-bold mb-6">
              ¡Evaluación Completada! 🎉
            </h3>
            <div className="text-8xl font-bold mb-4">{score.percentage}%</div>
            <p className="text-2xl mb-3">
              {score.correct} de {score.total} respuestas correctas
            </p>
            {score.percentage >= 80 && (
              <p className="bg-green-50 text-green-700 italic font-semibold p-6 rounded-2xl mb-6 text-2xl border-2 border-green-700">
                Usted ya sabe las bases de la educación finaciera, siga
                aprendiendo para enriquecer su conocimiento.
              </p>
            )}
            {score.percentage < 80 && (
              <p className="bg-white italic text-amber-500 font-medium p-6 rounded-2xl mb-6 text-2xl border-2 border-amber-500">
                Recuerda que solo queremos saber tus conocimiento previos, juega
                con nosotros para mejorar su conocimiento.
              </p>
            )}
            <Link to={"/"} className="btn btn-orange">
              Avanzar <ChevronRight />
            </Link>
          </div>
        </div>
      )}
    </ModulePageLayout>
  );
}
