import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import ThreeScene from "./ThreeScene";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Search Firestore for the username and get associated email
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setErrorMessage("Username not found");
        return;
      }

      const userData = querySnapshot.docs[0].data();
      const email = userData.email;

      // Authenticate with Firebase using retrieved email
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", userCredential.user);
      navigate("/grid");
    } catch (error) {
      setErrorMessage("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <ThreeScene />
      <div className="login-box">
        <h1>Hackers Game</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          {errorMessage && <div className="error-message"><p>{errorMessage}</p></div>}
          <button type="submit">Login</button>
        </form>
        <p className="signup-link">Don't have an account? <a href="/signup">Sign up</a></p>
      </div>
    </div>
  );
};

export default Login;
