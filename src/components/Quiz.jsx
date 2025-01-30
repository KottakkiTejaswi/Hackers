// Quiz.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Quiz.css';
import ThreeScene from './ThreeScene';

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      question: "> WHAT'S THE PRIMARY PURPOSE OF A FIREWALL?",
      options: [
        "BLOCK PHYSICAL INTRUSIONS",
        "FILTER NETWORK TRAFFIC",
        "PREVENT VIRUSES",
        "ENCRYPT DATA"
      ],
      correct: 0 /* This is the array value. crct ans option 1 */ 
    },
    {
      question: "> WHAT DOES 'DDoS' STAND FOR IN CYBERSECURITY?",
      options: [
        "DATA DISTRIBUTION OVER SERVICE",
        "DIGITAL DENIAL OF SYSTEM",
        "DIRECTED DENIAL OF SERVICE",
        "DISTRIBUTED DENIAL OF SERVICE"
      ],
      correct: 2
    },
    {
      question: "> WHICH CLOUD CONCEPT ENSURES SYSTEM AVAILABILITY?",
      options: [
        "AUTO-SCALING",
        "FAULT TOLERANCE",
        "LOAD BALANCING",
        "ALL OF ABOVE"
      ],
      correct: 2
    },
    {
      question: "> WHAT'S THE MAIN PURPOSE OF MULTI-FACTOR AUTHENTICATION?",
      options: [
        "INCREASE LOGIN SPEED",
        "REDUCE PASSWORD COMPLEXITY",
        "ADD SECURITY LAYERS",
        "TRACK USER LOCATION"
      ],
      correct: 1
    },
    {
      question: "> WHAT DOES A CDN PRIMARILY OPTIMIZE?",
      options: [
        "DATA ENCRYPTION",
        "CONTENT DELIVERY SPEED",
        "SERVER COSTS",
        "NETWORK SECURITY"
      ],
      correct: 0
    }
  ];

  const handleAnswer = (optionIndex) => {
    setSelectedAnswer(optionIndex);
    if(optionIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if(currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="quiz-container">
      <ThreeScene />
      <div className="cyber-quiz">
        {!showResult ? (
          <>
            <div className="quiz-header">
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${(currentQuestion + 1) * 20}%` }}
                ></div>
              </div>
              <h2>CYBERSECURITY KNOWLEDGE MATRIX</h2>
              <p>Question {currentQuestion + 1} of {questions.length}</p>
            </div>

            <div className="question-terminal">
              <h3>{questions[currentQuestion].question}</h3>
              <div className="options-grid">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    className={`cyber-option ${selectedAnswer === index ? 'active' : ''}`}
                    onClick={() => handleAnswer(index)}
                    disabled={selectedAnswer !== null}
                  >
                    <span className="option-prefix">[{index + 1}]</span> {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="quiz-controls">
              <button 
                className="cyber-button"
                onClick={handleNext}
                disabled={selectedAnswer === null}
              >
                {currentQuestion === questions.length - 1 ? 
                  "FINALIZE_SCAN" : "NEXT_QUESTION >"}
              </button>
            </div>
          </>
        ) : (
          <div className="result-terminal">
            <h2>SYSTEM SECURITY AUDIT COMPLETE</h2>
            <div className="score-display">
              <p>YOUR SECURITY RATING:</p>
              <div className="score-value">
                {Math.floor((score/questions.length) * 100)}%
                {Math.floor((score / questions.length) * 100) > 80 && (
                 <p className="unlocked-message">You have successfully unlocked your new attack</p>
                )}
              </div>
              <p>{score} OUT OF {questions.length} THREATS NEUTRALIZED</p>
            </div>
            <button 
              className="cyber-button"
              onClick={() => navigate('/world')}
            >
              RETURN_TO_NETWORK
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;