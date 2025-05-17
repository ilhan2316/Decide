import React, { useState } from 'react';

const DecisionBoard = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState('');

  const spinBoard = () => {
    setIsSpinning(true);
    setResult('');

    setTimeout(() => {
      const choice = Math.random() > 0.5 ? 'Yes 🟢' : 'No 🔴' ;
      setResult(choice);
      setIsSpinning(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-pink-100 via-purple-100 to-blue-100 flex flex-col items-center justify-center">
      <div className="bg-white rounded-full w-60 h-60 flex items-center justify-center text-3xl font-bold text-gray-700 border-4 border-dashed border-purple-300 mb-8">
        {isSpinning ? 'Spinning...' : result || '🎡'}
      </div>
      <button
        onClick={spinBoard}
        disabled={isSpinning}
        className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-full transition disabled:opacity-50"
      >
        Spin the Board
      </button>
    </div>
  );
};

export default DecisionBoard;
