import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [quote, setQuote] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/quote')
      .then(res => res.json())
      .then(data => setQuote(data.quote))
      .catch(err => console.error('Error fetching quote:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-[90%] max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome to</h1>
        <h2 className="text-3xl font-extrabold text-purple-600 mb-6">DECIDE</h2>
        <p className="italic text-gray-600 mb-4">
          "Not making a decision is actually a decision — a decision to stay the same."
        </p>
        <p className="mb-6 text-gray-700 font-medium">"{quote}"</p>
        <button
          className="bg-purple-400 hover:bg-purple-500 text-white font-semibold px-6 py-2 rounded-full transition"
          onClick={() => navigate('/login')}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
