import Quiz from './components/Quiz';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            JavaScript Quiz
          </h1>
        </div>
      </header>
      <main>
        <Quiz />
      </main>
    </div>
  );
}

export default App;
