import React, { useState } from 'react';

const RedAlertButton = () => {
  const [isRedBackground, setIsRedBackground] = useState(false);

  const handleButtonClick = () => {
    setIsRedBackground(true);
    setTimeout(() => {
      setIsRedBackground(false);
    }, 5000); // 5 seconds
  };

  return (
    <div>
      <style>
        {`
          .red-alert {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(255, 0, 0, 0.5);
            animation: blink 0.5s infinite;
            pointer-events: none;
          }

          @keyframes blink {
            0% { opacity: 0.5; }
            50% { opacity: 0.2; }
            100% { opacity: 0.5; }
          }
        `}
      </style>
      
      <button 
        onClick={handleButtonClick}
        style={{
          padding: '15px 30px',
          fontSize: '18px',
          cursor: 'pointer',
          position: 'relative',
          zIndex: 1
        }}
      >
        Trigger Red Alert
      </button>
      
      {isRedBackground && <div className="red-alert" />}
    </div>
  );
};

export default RedAlertButton;