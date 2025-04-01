import React, { useState,useEffect } from 'react';
import './index.css'
import Home from './pages/Home';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// small change
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const backendURL = import.meta.env.VITE_REACT_BACKEND_URL;
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            axios.post(`${backendURL}/verifyToken`, { token })
                .then(res => {
                    if (res.data.status === "ok") {
                        navigate("/client-dash");
                    }
                });
        }
    }, [navigate]);

  return (
    <div>
      <Home/>
    </div>
  );
}

export default App;