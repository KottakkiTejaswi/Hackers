// Story.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import "./Story.css";
import ThreeScene from "./ThreeScene";

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
        <h1 className="typewriter">{`> WELCOME, ${username}.INIT`}</h1>
        <p>{'>'} SYSTEM_SECURITY_PROTOCOL: ACTIVATED</p>
        <p>{'>'} CYBER_ODYSSEY_INITIALIZING...</p>
        <p>{'>'} OBJECTIVE: PENETRATE CORPORATE INDIVIDUAL'S NETWORK</p>
        <p>{'>'} MISSION: LEARN CLOUD SECURITY THROUGH REAL-WORLD SCENARIOS</p>
        <p>{'>'} WARNING: YOUR ACTIONS WILL HAVE CONSEQUENCES</p>
        <br />
        <button className="continue-btn" onClick={handleContinue}>
          INITIATE_SEQUENCE
        </button>
      </div>
    </div>
  );
};

export default Story;