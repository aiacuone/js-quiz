import Quiz from './components/Quiz';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          JavaScript Advanced Quiz
        </h1>
        <p className="text-gray-600">
          Test your knowledge of intermediate to advanced JavaScript concepts
        </p>
      </div>
      <Quiz />
    </div>
  );
}

export default App;
