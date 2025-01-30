// World.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './World.css';
import ThreeScene from './ThreeScene';

const World = () => {
  const navigate = useNavigate();
  const [currentOpponent, setCurrentOpponent] = useState(0);
  
  // Mock data - replace with actual data from your backend
  const opponents = [
    { id: 1, username: 'CyberPhantom', points: 2450, network: 'AWS' },
    { id: 2, username: 'NeonGhost', points: 3150, network: 'Azure' },
    { id: 3, username: 'ByteBandit', points: 1820, network: 'GCP' },
    { id: 4, username: 'CodeWraith', points: 2750, network: 'Hybrid' },
  ];

  const handlePrev = () => {
    setCurrentOpponent((prev) => (prev > 0 ? prev - 1 : opponents.length - 1));
  };

  const handleNext = () => {
    setCurrentOpponent((prev) => (prev < opponents.length - 1 ? prev + 1 : 0));
  };

  const handleAttack = () => {
    // Add attack logic here
    console.log('Attacking:', opponents[currentOpponent].username);
    navigate('/battle'); // Redirect to battle page
  };

  return (
    <div className="world-container">
      <ThreeScene />
      <div className="cyber-carousel">
        <div className="navigation-arrows">
          <button className="cyber-arrow prev" onClick={handlePrev}>◄</button>
          <div className="opponent-card">
            <div className="hacker-terminal">
              <div className="terminal-header">
                <span className="blinking-cursor">■</span>
                <h2>{opponents[currentOpponent].username}</h2>
                <span className="blinking-cursor">■</span>
              </div>
              <div className="terminal-body">
                <p>{'>'} SECURITY_LEVEL: {Math.floor(Math.random() * 10)}/10</p>
                <p>{'>'} POINTS: {opponents[currentOpponent].points}</p>
                <p>{'>'} NETWORK: {opponents[currentOpponent].network}</p>
                <p>{'>'} VULNERABILITIES_DETECTED: {Math.floor(Math.random() * 5)}</p>
              </div>
              <button 
                className="view-button"
                onClick={() => console.log('View network')}
              >
                ACCESS_NETWORK [→]
              </button>
            </div>
          </div>
          <button className="cyber-arrow next" onClick={handleNext}>►</button>
        </div>
        <button className="attack-button" onClick={handleAttack}>
          INITIATE_ATTACK_SEQUENCE
        </button>
      </div>
    </div>
  );
};

export default World;