import React, { useState, useEffect } from "react";
import "./Profile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";

const Profile = () => {
  const [profile, setProfile] = useState({
    username: "gamer_123",
    sid: "N790385",
    coins: 1500,
    personaImage: "./src/images/h4.png", // Default persona image
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showPersonaModal, setShowPersonaModal] = useState(false);
  const [formData, setFormData] = useState(profile);
  const getsid = localStorage.getItem("userSid");
  const [userName, setUserName] = useState("Null");
  const [userCoins, setUserCoins] = useState(0);
  const navigate = useNavigate();

  const personaOptions = [
    { id: 1, src: "./src/images/h4.png", alt: "Persona 1" },
    { id: 2, src: "./src/images/h2.png", alt: "Persona 2" },
    { id: 3, src: "./src/images/h3.png", alt: "Persona 3" },
    { id: 4, src: "./src/images/h5.png", alt: "Persona 4" },
  ];

  const componentImages = [
    { id: 1, src: "./public/coin_miner.png", alt: "Component 1", name: "Coin Miner", points: 5 },
    { id: 2, src: "./public/coin_storage.png", alt: "Component 2", name: "Coin Storage", points: 5 },
    { id: 3, src: "./public/database.png", alt: "Component 3", name: "Database", points: 5 },
    { id: 4, src: "./public/firewall.png", alt: "Component 4", name: "Firewall", points: 20 },
    { id: 5, src: "./public/www_endpoint.png", alt: "Component 5", name: "WWW Endpoint", points: 0 },
    { id: 6, src: "./public/load_balancer.png", alt: "Component 6", name: "Load Balancer", points: 5 },
    { id: 7, src: "./public/server.png", alt: "Component 7", name: "Server", points: 5 },
    { id: 8, src: "./public/security_module.png", alt: "Component 8", name: "Switch", points: 10 },
  ];

  const [attackImages, setAttackImages] = useState([
    { id: 1, src: "./src/images/sq116.png", alt: "SQL Injection", name: "SQL Injection", dbName: "SQL Injection", points: 0 },
    { id: 2, src: "./public/ddos1.png", alt: "DDoS Attack", name: "DDoS Attack", dbName: "DDOS", points: 0 },
    { id: 3, src: "./src/images/brute.png", alt: "Brute Force", name: "Brute Force", dbName: "Brute Force", points: 0 },
    { id: 4, src: "./src/images/mimt.png", alt: "Man-in-the-Middle", name: "Man-in-the-Middle", dbName: "Man in Middle", points: 0 },
    { id: 5, src: "./src/images/phishing.png", alt: "Phishing", name: "Phishing", dbName: "Phishing", points: 0 },
    { id: 6, src: "./src/images/trojan.png", alt: "Trojan Horse", name: "Trojan Horse", dbName: "Trojan Virus", points: 0 },
    { id: 7, src: "./src/images/zero.png", alt: "Zero-Day Exploit", name: "Zero-Day Exploit", dbName: "Zero Day Exploit", points: 0 },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfileResponse = await axios.get(`http://localhost:8080/getBasicUserProfile?sid=${getsid}`);
        const attackComponentResponse = await axios.get(`http://localhost:8080/getAttackComponent?sid=${getsid}`);

        setUserName(userProfileResponse.data.name);
        setUserCoins(userProfileResponse.data.coin);

        const attackData = attackComponentResponse.data;
        const updatedAttackImages = attackImages.map((image) => {
          const matchingAttack = attackData.find((attack) => attack.attack_nm === image.dbName);
          return matchingAttack ? { ...image, points: matchingAttack.points } : image;
        });

        setAttackImages(updatedAttackImages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogout = () => {
    localStorage.removeItem("userSid");
    navigate("/");
  };

  const handleUpgradeClick = (id) => {
    if (id === 1) navigate("/quiz");
    if (id === 5) navigate("/quiztwo");
    if (id === 7) navigate("/storyquiz");
  };

  return (
    <>
      <BackButton />
    <div className="profile-container">
    

      <div className="page-container">
        {/* Left Section: Components & Attack Mechanisms */}
        <div className="left-side">
          <h2>Components</h2>
          <div className="components-gallery">
            {componentImages.map((image) => (
              <div key={image.id} className="component-image-container">
                <img src={image.src} alt={image.alt} className="component-image" />
                <div className="tooltip">{image.name}</div>
                <button className="action-button">Pts: {image.points}</button>
              </div>
            ))}
          </div>

          <h2>Attack Mechanisms</h2>
          <div className="attacks-gallery">
            {attackImages.map((image) => (
              <div key={image.id} className="attack-image-container">
                <img src={image.src} alt={image.alt} className="attack-image" />
                <div className="tooltip">{image.name}</div>
                <div className="button-container">
                  <button className="action-button">Pts: {image.points}</button>
                  <button className="action-button" onClick={() => handleUpgradeClick(image.id)}>
                    Upgrade
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section: Gaming Profile */}
        <div className="right-side">
          <div className="gaming-profile-container">
            {/* Neon-styled header at the top-left */}
            <h2 className="profile-title">Profile</h2>

            <div className="persona-image-container">
              <img src={profile.personaImage} alt="Persona" className="persona-image" />
              {isEditing && (
                <button className="edit-persona-button" onClick={() => setShowPersonaModal(true)}>
                  Edit 
                </button>
              )}
            </div>

            <div className="profile-details">
              <div className="profile-section">
                <label>Username:</label>
                {isEditing ? (
                  <input type="text" name="username" value={userName} onChange={handleChange} />
                ) : (
                  <span>{userName}</span>
                )}
              </div>

              <div className="profile-section">
                <label>Sid:</label>
                <span>{getsid}</span>
              </div>

              <div className="profile-section">
                <label>Coins:</label>
                {isEditing ? (
                  <input type="number" name="coins" value={formData.coins} onChange={handleChange} />
                ) : (
                  <span>{userCoins}</span>
                )}
              </div>
            </div>

            {/* Sign out button at the bottom */}
            <div className="sign-out-wrapper">
              <button className="action-button sign-out-button" onClick={handleLogout}>
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Profile;
