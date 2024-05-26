import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeroSection from "./pages/HeroSection";
import './App.css';
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
