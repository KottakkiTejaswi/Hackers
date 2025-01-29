import React from "react";
import Login from "./components/Login";
import Grid from "./components/Grid";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import DynamicGeometry from "./components/DynamicGeometry";
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/grid" element={<Grid />} />
          <Route path="/dynamic" element={<DynamicGeometry />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;