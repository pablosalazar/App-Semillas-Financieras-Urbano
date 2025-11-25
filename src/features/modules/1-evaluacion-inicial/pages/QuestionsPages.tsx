import { useState } from "react";
import { QuizQuestion } from "../components/QuizQuestion";
import { EVALUATION_INITIAL_QUESTIONS } from "../constants/questions";
import { ProgressBar } from "@/shared/components/ProgressBar";

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
    <div className="flex flex-col min-h-screen px-4  -mt-10">
      {/* Header with Ribbon */}
      <div className="flex justify-center">
        <div className="ribbon ribbon-orange mb-3">
          <div className="content">Evaluación Inicial</div>
        </div>
      </div>

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
            <p className="text-2xl mb-8">
              {score.correct} de {score.total} respuestas correctas
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
