// Story.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import "./Story.css";


const Story = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

//   useEffect(() => {
//     const user = auth.currentUser;
//     if (!user) {
//       navigate("/login");
//     } else {
//       setUsername(user.displayName);
//     }
//   }, [navigate]);

  const handleContinue = () => {
    navigate("/grid");
  };

  return (
    <div className="story-container">
      
      <div className="terminal">
        <h1 className="typewriter" style={{color:'red'}}> ACCESS DENIED !!</h1>
        <p>{'>'} ERROR 0x7F3A21: Security clearance insufficient </p>
        
        <p>{'>'} Current exploit level: LOW</p>
        <p>{'>'} Required exploit level: ADVANCED</p>
        <p>{'>'} MISSION: Complete the course "Zero Day Exploit" to unlock this Attack Mechanism</p>
        <p>{'>'} Hint: The more you learn, the more you grow!</p>
        <br />
        <button className="continue-btn" onClick={handleContinue}>
          INITIATE_TRAINING_PROTOCOL
        </button>
      </div>
    </div>
  );
};

export default Story;