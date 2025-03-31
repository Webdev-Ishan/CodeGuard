import React, { useState,useEffect } from 'react';
import axios from 'axios';
import 'prismjs/themes/prism-tomorrow.css'
import Prism from 'prismjs'
import Markdown from 'react-markdown'
const App = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    // Highlight the code whenever the response changes
    Prism.highlightAll();
  }, [response]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let { data } = await axios.post('http://localhost:3000/ai/get-response', { prompt });
      setResponse(data);
      setPrompt('')
    } catch (error) {
      setResponse('An error occurred while processing your request.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-4">
      {/* Header */}
      <header className="w-full max-w-4xl text-center py-6">
        <h1 className="text-5xl font-bold text-yellow-500">CodeGuard</h1>
        <p className="text-gray-400 mt-2">
          Your AI-powered code reviewer. Paste your code below to get detailed feedback.
        </p>
      </header>

      {/* Input Form */}
      <main className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea
            className="w-full h-40 p-4 bg-black text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Paste your code or ask a follow-up question..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg hover:bg-yellow-600 transition"
            disabled={loading}
          >
            {loading ? 'Analyzing...' : 'Submit'}
          </button>
        </form>

        {/* Response Section */}
        {response && (
          <div className="mt-6 bg-black p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold text-yellow-500 mb-2">AI Feedback:</h2>
            <pre className="rounded-lg">
              <code className="language-javascript">
                <Markdown>
                  {response}
                </Markdown>
              </code>
            </pre>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;