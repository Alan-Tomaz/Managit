import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeroSection from "./pages/HeroSection";
import './App.css';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const showToastMessage = (type, msg) => {
    if (type == 'success') {
      toast.success(msg, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    }
  };

  return (
    <div className="app">
      <BrowserRouter>
        <ToastContainer position='top-center' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home showToastMessage={showToastMessage} />} />
          <Route path="/home/:choosenSection" element={<Home showToastMessage={showToastMessage} />} />
          <Route path="/home/:choosenSection/:choosenSubSection" element={<Home showToastMessage={showToastMessage} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
