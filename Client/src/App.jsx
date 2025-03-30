import React, { useState } from 'react';
import axios from 'axios'
const App = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');

    try {
      const res = await axios.get('http://localhost:3000/api/get-response', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.text();
      setResponse(data);
    } catch (error) {
      setResponse('An error occurred while processing your request.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4">
      {/* Header */}
      <header className="w-full max-w-4xl text-center py-6">
        <h1 className="text-4xl font-bold text-yellow-500">CodeGuard</h1>
        <p className="text-gray-400 mt-2">
          Your AI-powered code reviewer. Paste your code below to get detailed feedback.
        </p>
      </header>

      {/* Input Form */}
      <main className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea
            className="w-full h-40 p-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Paste your code here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg hover:bg-yellow-600 transition"
            disabled={loading}
          >
            {loading ? 'Analyzing...' : 'Submit for Review'}
          </button>
        </form>

        {/* Response Section */}
        {response && (
          <div className="mt-6 bg-gray-700 p-4 rounded-lg">
            <h2 className="text-lg font-bold text-yellow-500">AI Feedback:</h2>
            <pre className="mt-2 text-gray-300 whitespace-pre-wrap">{response}</pre>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;

