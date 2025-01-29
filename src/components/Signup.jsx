import React, { useState } from "react";
import { createUserWithEmailAndPassword , updateProfile} from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, setDoc ,getDoc,  serverTimestamp} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import ThreeScene from "./ThreeScene";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
        // Check if username already exists
      const userDoc = await getDoc(doc(db, "users", username));
      if (userDoc.exists()) {
        setErrorMessage("Username already exists");
        return;
      }

      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user profile with username
      await updateProfile(user, { displayName: username });


      // Store username and email in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uuserId: user.uid,
        email: email,
        username: username,
        createdAt: serverTimestamp(),
      });

      console.log("User registered:", user);
      navigate("/grid");
    } catch (error) {
      setErrorMessage(error.message);

      
    }
  };

  return (
    <div className="login-container">
      <ThreeScene />
      <div className="login-box">
        <h1>Signup</h1>
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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
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
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
            />
          </div>
          {errorMessage && <div className="error-message"><p>{errorMessage}</p></div>}
          <button type="submit">Signup</button>
        </form>
        <p className="signup-link">Already have an account? <a href="/">Login</a></p>
      </div>
    </div>
  );
};

export default Signup;
