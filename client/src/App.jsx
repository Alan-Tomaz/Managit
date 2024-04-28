import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeroSection from "./pages/HeroSection";
import './App.css';
import Register from "./pages/Register";

function App() {

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
