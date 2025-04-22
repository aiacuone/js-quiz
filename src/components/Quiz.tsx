import { useState, useEffect } from 'react';
import { questions as originalQuestions } from '../data/questions';

interface QuizState {
  currentQuestionIndex: number;
  score: number;
  showResults: boolean;
  answers: number[];
  showFeedback: boolean;
  lastAnsweredCorrectly: boolean;
  randomizedQuestions: typeof originalQuestions;
}

// Fisher-Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function Quiz() {
  const [state, setState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    showResults: false,
    answers: [],
    showFeedback: false,
    lastAnsweredCorrectly: false,
    randomizedQuestions: [],
  });

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      randomizedQuestions: shuffleArray(originalQuestions),
    }));
  }, []);

  const currentQuestion = state.randomizedQuestions[state.currentQuestionIndex];

  const handleAnswer = (selectedOption: number) => {
    const newAnswers = [...state.answers];
    newAnswers[state.currentQuestionIndex] = selectedOption;

    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    const newScore = state.randomizedQuestions.reduce(
      (score, question, index) => {
        return score + (newAnswers[index] === question.correctAnswer ? 1 : 0);
      },
      0
    );

    setState({
      ...state,
      answers: newAnswers,
      score: newScore,
      showFeedback: true,
      lastAnsweredCorrectly: isCorrect,
    });
  };

  const handleNext = () => {
    if (state.currentQuestionIndex === state.randomizedQuestions.length - 1) {
      setState({
        ...state,
        showResults: true,
        showFeedback: false,
      });
    } else {
      setState({
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        showFeedback: false,
      });
    }
  };

  const resetQuiz = () => {
    setState({
      currentQuestionIndex: 0,
      score: 0,
      showResults: false,
      answers: [],
      showFeedback: false,
      lastAnsweredCorrectly: false,
      randomizedQuestions: shuffleArray(originalQuestions), // Shuffle questions on reset
    });
  };

  // Show loading state while questions are being randomized
  if (state.randomizedQuestions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (state.showResults) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
        <p className="text-xl mb-4">
          Your score: {state.score} out of {state.randomizedQuestions.length}
        </p>
        <div className="space-y-4">
          {state.randomizedQuestions.map((question, index) => (
            <div
              key={question.id}
              className={`p-4 rounded-lg ${
                state.answers[index] === question.correctAnswer
                  ? 'bg-green-100'
                  : 'bg-red-100'
              }`}
            >
              <p className="font-semibold">{question.question}</p>
              {question.code && (
                <pre className="bg-gray-800 text-white p-4 rounded-lg my-2 overflow-x-auto">
                  <code>{question.code}</code>
                </pre>
              )}
              <p className="mt-2">
                Your answer: {question.options[state.answers[index]]}
              </p>
              <p className="mt-1">
                Correct answer: {question.options[question.correctAnswer]}
              </p>
              <p className="mt-2 text-gray-600">{question.explanation}</p>
            </div>
          ))}
        </div>
        <button
          onClick={resetQuiz}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-4 flex justify-between items-center">
        <span className="text-sm text-gray-600">
          Question {state.currentQuestionIndex + 1} of{' '}
          {state.randomizedQuestions.length}
        </span>
        <span className="text-sm text-gray-600">Score: {state.score}</span>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-4">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            {currentQuestion.category}
          </span>
        </div>
        <h2 className="text-xl font-bold mb-4">{currentQuestion.question}</h2>
        {currentQuestion.code && (
          <pre className="bg-gray-800 text-white p-4 rounded-lg mb-4 overflow-x-auto">
            <code>{currentQuestion.code}</code>
          </pre>
        )}
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={state.showFeedback}
              className={`w-full text-left p-3 rounded-lg border transition-colors ${
                state.showFeedback
                  ? index === currentQuestion.correctAnswer
                    ? 'bg-green-100 border-green-500'
                    : index === state.answers[state.currentQuestionIndex]
                    ? 'bg-red-100 border-red-500'
                    : 'border-gray-300 opacity-50'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        {state.showFeedback && (
          <div
            className={`mt-6 p-4 rounded-lg ${
              state.lastAnsweredCorrectly ? 'bg-green-50' : 'bg-red-50'
            }`}
          >
            <p className="font-semibold mb-2">
              {state.lastAnsweredCorrectly ? '✅ Correct!' : '❌ Incorrect'}
            </p>
            <p className="text-gray-600">{currentQuestion.explanation}</p>
            <button
              onClick={handleNext}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {state.currentQuestionIndex ===
              state.randomizedQuestions.length - 1
                ? 'Show Results'
                : 'Next Question'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
