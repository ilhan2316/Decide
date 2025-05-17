import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'admin' && password === 'bunny123') {
      navigate('/board');
    } else {
      alert('Wrong credentials! Try: anything else ;/');
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-[90%] max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-purple-600">DECIDE</h2>
          <span className="text-3xl">🐰</span>
        </div>
        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none"
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none"
          onChange={e => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-purple-400 hover:bg-purple-500 text-white font-bold py-2 rounded-full"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
