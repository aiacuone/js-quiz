import { useState, useEffect } from 'react';
import { questions } from '../data/questions';

interface QuizState {
  currentQuestionIndex: number;
  score: number;
  selectedAnswers: string[];
  quizCompleted: boolean;
  shuffledQuestions: typeof questions;
}

const Quiz = () => {
  const [state, setState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    selectedAnswers: [],
    quizCompleted: false,
    shuffledQuestions: [],
  });

  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    // Shuffle questions and take first 10
    const shuffled = [...questions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);
    setState((prev) => ({ ...prev, shuffledQuestions: shuffled }));
  }, []);

  const handleAnswerSelect = (answer: string) => {
    if (showExplanation) return; // Prevent selecting answer after showing explanation

    const currentQuestion = state.shuffledQuestions[state.currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;

    setState((prev) => ({
      ...prev,
      selectedAnswers: [...prev.selectedAnswers, answer],
      score: isCorrect ? prev.score + 1 : prev.score,
    }));

    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    const nextIndex = state.currentQuestionIndex + 1;

    if (nextIndex >= state.shuffledQuestions.length) {
      setState((prev) => ({ ...prev, quizCompleted: true }));
    } else {
      setState((prev) => ({ ...prev, currentQuestionIndex: nextIndex }));
      setShowExplanation(false);
    }
  };

  const handleRestartQuiz = () => {
    const shuffled = [...questions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);
    setState({
      currentQuestionIndex: 0,
      score: 0,
      selectedAnswers: [],
      quizCompleted: false,
      shuffledQuestions: shuffled,
    });
    setShowExplanation(false);
  };

  if (state.shuffledQuestions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl font-semibold">Loading quiz...</div>
      </div>
    );
  }

  if (state.quizCompleted) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            Quiz Completed!
          </h2>
          <div className="text-center mb-8">
            <p className="text-2xl font-semibold">
              Your Score: {state.score} out of {state.shuffledQuestions.length}
            </p>
            <p className="text-lg mt-2">
              Percentage:{' '}
              {((state.score / state.shuffledQuestions.length) * 100).toFixed(
                1
              )}
              %
            </p>
          </div>
          <button
            onClick={handleRestartQuiz}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = state.shuffledQuestions[state.currentQuestionIndex];
  const selectedAnswer = state.selectedAnswers[state.currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">
              Question {state.currentQuestionIndex + 1} of{' '}
              {state.shuffledQuestions.length}
            </span>
            <span className="text-lg font-semibold">Score: {state.score}</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-blue-600 rounded-full transition-all duration-300"
              style={{
                width: `${
                  ((state.currentQuestionIndex + 1) /
                    state.shuffledQuestions.length) *
                  100
                }%`,
              }}
            />
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-6">
          {currentQuestion.question}
        </h2>

        <div className="space-y-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              disabled={showExplanation}
              className={`w-full p-4 text-left rounded-lg transition-colors duration-200 ${
                showExplanation
                  ? option === currentQuestion.correctAnswer
                    ? 'bg-green-100 border-2 border-green-500'
                    : option === selectedAnswer
                    ? 'bg-red-100 border-2 border-red-500'
                    : 'bg-gray-100 border-2 border-transparent'
                  : 'bg-gray-100 hover:bg-gray-200 border-2 border-transparent'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {showExplanation && (
          <div className="mt-6">
            <div
              className={`p-4 rounded-lg ${
                isCorrect ? 'bg-green-100' : 'bg-red-100'
              }`}
            >
              <p className="font-semibold mb-2">
                {isCorrect ? '✅ Correct!' : '❌ Incorrect!'}
              </p>
              <p>{currentQuestion.explanation}</p>
            </div>
            <button
              onClick={handleNextQuestion}
              className="w-full mt-4 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              {state.currentQuestionIndex === state.shuffledQuestions.length - 1
                ? 'Finish Quiz'
                : 'Next Question'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
