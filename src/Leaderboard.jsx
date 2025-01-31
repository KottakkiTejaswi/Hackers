import React, { useState } from "react";
import "./Leaderboard.css";

const initialData = [
  { name: "NeoHacker", coins: 1200, vulnerabilities: 3, level: "Elite" },
  { name: "CyberGhost", coins: 950, vulnerabilities: 1, level: "Pro" },
  { name: "GlitchMaster", coins: 780, vulnerabilities: 2, level: "Intermediate" },
  { name: "ByteNinja", coins: 1300, vulnerabilities: 0, level: "Legendary" },
];

const Leaderboard = () => {
  const [data, setData] = useState(initialData);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const sortTable = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setData(sortedData);
  };

  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">LEADERBOARD</h1>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th onClick={() => sortTable("name")}>Name</th>
            <th onClick={() => sortTable("coins")}>Coins</th>
            <th onClick={() => sortTable("vulnerabilities")}>Vulnerabilities</th>
            <th onClick={() => sortTable("level")}>Level</th>
          </tr>
        </thead>
        <tbody>
          {data.map((player, index) => (
            <tr key={index}>
              <td>{player.name}</td>
              <td>{player.coins}</td>
              <td>{player.vulnerabilities}</td>
              <td>{player.level}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
