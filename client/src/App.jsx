import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeroSection from "./pages/HeroSection";
import './App.css';

function App() {

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HeroSection />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
