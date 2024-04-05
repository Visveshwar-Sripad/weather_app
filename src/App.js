import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Routes } from "react-router-dom";

import Login from "./components/login/login";
import SignUp from "./components/signup/signup";
import "./App.css";
import Weather from "./components/weather/weather";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/weather" element={<Weather />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
