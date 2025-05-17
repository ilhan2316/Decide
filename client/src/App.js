import React, { useState, useEffect } from 'react';
import './App.css';

// Cute bunny SVG component
const CuteBunny = () => (
  <svg width="40" height="40" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="38" fill="#FFFFFF" />
    <circle cx="35" cy="40" r="6" fill="#FFD6E0" />
    <circle cx="65" cy="40" r="6" fill="#FFD6E0" />
    <ellipse cx="50" cy="58" rx="8" ry="5" fill="#FFD6E0" />
    <path d="M30 25 C20 0, 5 20, 24 35" stroke="#FFFFFF" strokeWidth="8" fill="#FFFFFF" />
    <path d="M70 25 C80 0, 95 20, 76 35" stroke="#FFFFFF" strokeWidth="8" fill="#FFFFFF" />
    <circle cx="35" cy="38" r="3" fill="#333333" />
    <circle cx="65" cy="38" r="3" fill="#333333" />
    <circle cx="35" cy="36" r="1" fill="#FFFFFF" />
    <circle cx="65" cy="36" r="1" fill="#FFFFFF" />
  </svg>
);

// Improved wheel component with animation
function EnhancedWheel({ result, isSpinning, onSpinComplete }) {
  const [currentAngle, setCurrentAngle] = useState(0);
  const [animating, setAnimating] = useState(false);
  
  useEffect(() => {
    if (isSpinning && !animating) {
      setAnimating(true);
      // Determine final angle based on result (Yes = 30deg, No = 210deg)
      const finalAngle = result === 'Yes' ? 1080 + 30 : 1080 + 210; 
      
      // Start animation
      let startTime = null;
      const duration = 3000; // 3 seconds for spin
      
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease-out function for more realistic spinning
        const easeOut = (t) => 1 - Math.pow(1 - t, 2);
        const angle = progress < 1 ? progress * finalAngle * easeOut(progress) : finalAngle;
        
        setCurrentAngle(angle);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setAnimating(false);
          onSpinComplete();
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isSpinning, result, animating, onSpinComplete]);
  
  return (
    <div className="wheel-container">
      <div 
        className="wheel" 
        style={{ transform: `rotate(${currentAngle}deg)`, transition: animating ? 'none' : 'transform 0.5s ease-out' }}
      >
        <div className="segment yes-segment">
          <span className="segment-text">Yes</span>
        </div>
        <div className="segment no-segment">
          <span className="segment-text">No</span>
        </div>
        <div className="segment yes-segment">
          <span className="segment-text">Yes</span>
        </div>
        <div className="segment no-segment">
          <span className="segment-text">No</span>
        </div>
        <div className="wheel-center"></div>
      </div>
      <div className="wheel-pointer"></div>
    </div>
  );
}

function App() {
  const [step, setStep] = useState('landing'); // 'landing' | 'login' | 'decision' | 'reflection'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [question, setQuestion] = useState('');
  const [quote, setQuote] = useState("Trust the journey ahead of you.");
  const [decision, setDecision] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelResult, setWheelResult] = useState(null);
  const [decisionMade, setDecisionMade] = useState(false);
  const [feeling, setFeeling] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // Context-aware messages based on question type
  const getContextMessage = (question, decision) => {
    if (!question || !decision) return "Trust the journey ahead of you.";
  
    const questionLower = question.toLowerCase();
    let contextPrefix = "";
    
    // Career related
    if (questionLower.includes('job') || questionLower.includes('career') || 
        questionLower.includes('work') || questionLower.includes('quit') ||
        questionLower.includes('move out')) {
      contextPrefix = decision === 'Yes' ? 
        "It's time for growth - " : 
        "Stay where you can thrive - ";
    }
    // Relationship related
    else if (questionLower.includes('date') || questionLower.includes('relationship') || 
             questionLower.includes('partner') || questionLower.includes('marry')) {
      contextPrefix = decision === 'Yes' ? 
        "Follow your heart - " : 
        "Trust your instincts - ";
    }
    // Purchase related
    else if (questionLower.includes('buy') || questionLower.includes('purchase') || 
             questionLower.includes('spend') || questionLower.includes('invest')) {
      contextPrefix = decision === 'Yes' ? 
        "Value over price - " : 
        "Save for what matters - ";
    }
    // Food related
    else if (questionLower.includes('eat') || questionLower.includes('food') || 
             questionLower.includes('dinner') || questionLower.includes('lunch')) {
      contextPrefix = decision === 'Yes' ? 
        "Treat yourself - " : 
        "Home comfort awaits - ";
    }
    
    // Return with base quote if no context was detected
    const baseQuote = "Trust the journey ahead of you.";
    return contextPrefix + baseQuote;
  };

  const handleLogin = () => {
    // Check for specific username and password
    if (username === 'admin' && password === 'bunny123') {
      setLoginError(''); // Clear any previous error
      setStep('question');
    } else {
      setLoginError('Invalid username or password. Please try again.');
    }
  };

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    if (question.trim() === '') {
      alert('Please enter your question');
      return;
    }
    setStep('decision');
  };

  const fetchQuoteAndDecision = async () => {
    if (decisionMade) {
      return; // Prevent multiple spins per decision
    }
    
    setIsSpinning(true);
    
    try {
      // Fetch quote
      const quoteRes = await fetch('http://localhost:5000/api/quote');
      const quoteData = await quoteRes.json();
      const baseQuote = quoteData.quote || "Trust the journey ahead of you.";
      setQuote(baseQuote);
      
      // Random selection between Yes and No
      const result = Math.random() > 0.5 ? 'Yes' : 'No';
      setWheelResult(result);
      
    } catch (error) {
      console.error("Error fetching data:", error);
      // Fallback quotes if server is not available
      const fallbackQuotes = [
        "Trust yourself. You know more than you think you do.",
        "The best way to predict your future is to create it.",
        "Sometimes the right path isn't the easiest one.",
        "Every decision is a new beginning.",
        "When in doubt, choose growth."
      ];
      const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
      setQuote(randomQuote);
      const result = Math.random() > 0.5 ? 'Yes' : 'No';
      setWheelResult(result);
    }
  };

  const handleSpinComplete = () => {
    // Make sure we have a decision result
    const finalResult = wheelResult || 'Yes';
    const baseQuote = quote || "Trust the journey ahead of you.";
    const contextualizedMessage = getContextMessage(question, finalResult);
    
    setDecision(finalResult);
    setQuote(contextualizedMessage);
    setIsSpinning(false);
    setDecisionMade(true);
    
    // Show reflection step after a short delay
    setTimeout(() => {
      setStep('reflection');
    }, 2000);
  };

  const handleNewDecision = () => {
    setQuestion('');
    setDecision('');
    setQuote('');
    setDecisionMade(false);
    setFeeling('');
    setStep('question');
  };

  const submitReflection = () => {
    alert('Thank you for reflecting! Come back tomorrow for another decision.');
    handleNewDecision();
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1 className="heading">DECIDE</h1>
          <CuteBunny />
        </div>
      </header>
      
      <main className="main-content">
        {step === 'landing' && (
          <div className="landing">
            <div className="quote-container">
              <p className="landing-quote">"Not making a decision is actually a decision — a decision to stay the same."</p>
            </div>
            <button className="primary-button pulse-animation" onClick={() => setStep('login')}>Login</button>
          </div>
        )}
        
        {step === 'login' && (
          <div className="login-form">
            <div className="form-container">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              {loginError && <p className="error-message">{loginError}</p>}
              <button className="primary-button" onClick={handleLogin}>Login</button>
            </div>
          </div>
        )}
        
        {step === 'question' && (
          <div className="question-form">
            <h2 className="question-heading">What are you deciding on today?</h2>
            <p className="subtext">Be specific about your yes/no question</p>
            <form onSubmit={handleQuestionSubmit}>
              <textarea
                placeholder="Should I..."
                value={question}
                onChange={e => setQuestion(e.target.value)}
                rows={4}
              />
              <button type="submit" className="primary-button">
                Continue
              </button>
            </form>
          </div>
        )}
        
        {step === 'decision' && (
          <div className="decision-page">
            <div className="question-display">
              <h3>Your Question:</h3>
              <p className="user-question">{question}</p>
            </div>
            
            {/* Enhanced Wheel component */}
            <EnhancedWheel 
              result={wheelResult}
              isSpinning={isSpinning}
              onSpinComplete={handleSpinComplete}
            />
            
            <div className="result-box">
              {decision ? (
                <>
                  <p>Your answer: <span className="decision-result">{decision}</span></p>
                  <p className="contextual-quote">{quote}</p>
                </>
              ) : (
                <p>Awaiting your decision...</p>
              )}
            </div>
            
            <div className="action-area">
              <button
                className={`primary-button ${!isSpinning && !decisionMade ? 'pulse-animation' : ''}`}
                onClick={fetchQuoteAndDecision}
                disabled={isSpinning || decisionMade}
              >
                {isSpinning ? "Revealing answer..." : decisionMade ? "Decision made" : "Reveal my answer"}
              </button>
            </div>
          </div>
        )}
        
        {step === 'reflection' && (
          <div className="reflection-form">
            <h2 className="reflection-heading">Reflect on your decision</h2>
            <div className="decision-summary">
              <p>For your question: <span className="highlight">{question || "Move out"}</span></p>
              <p>The answer was: <span className="decision-result">{decision || "No decision made"}</span></p>
              <p>With guidance: <span className="italic">"{quote || "No guidance available"}"</span></p>
            </div>
            
            <div className="reflection-questions">
              <p className="feeling-prompt">How does this answer make you feel?</p>
              <div className="feeling-options">
                <button 
                  className={`feeling-btn ${feeling === 'relieved' ? 'selected' : ''}`}
                  onClick={() => setFeeling('relieved')}
                >
                  😌 Relieved
                </button>
                <button 
                  className={`feeling-btn ${feeling === 'unsure' ? 'selected' : ''}`}
                  onClick={() => setFeeling('unsure')}
                >
                  🤔 Unsure
                </button>
                <button 
                  className={`feeling-btn ${feeling === 'disappointed' ? 'selected' : ''}`}
                  onClick={() => setFeeling('disappointed')}
                >
                  😕 Disappointed
                </button>
                <button 
                  className={`feeling-btn ${feeling === 'excited' ? 'selected' : ''}`}
                  onClick={() => setFeeling('excited')}
                >
                  😄 Excited
                </button>
              </div>
              
              {feeling && (
                <div className="reflection-insight">
                  {feeling === 'relieved' && <p>Being relieved suggests this was the answer you hoped for. Trust your intuition!</p>}
                  {feeling === 'unsure' && <p>Uncertainty may mean you need more information before deciding.</p>}
                  {feeling === 'disappointed' && <p>If you're disappointed, perhaps your heart already knew what you wanted.</p>}
                  {feeling === 'excited' && <p>Excitement indicates this decision aligns with your true desires!</p>}
                </div>
              )}
              
              <div className="next-steps">
                <button className="secondary-button" onClick={handleNewDecision}>New Decision</button>
                <button className="primary-button" onClick={submitReflection} disabled={!feeling}>Complete Reflection</button>
              </div>
              
              <p className="daily-limit">
                One decision a day keeps overthinking away 🌱
              </p>
            </div>
          </div>
        )}
      </main>
      
      <footer className="App-footer">
        <p>Make better decisions with DECIDE</p>
      </footer>
    </div>
  );
}

export default App;