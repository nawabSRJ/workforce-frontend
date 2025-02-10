import React, { useState } from 'react';

import './index.css'
import ClientDash from './pages/ClientDash';
import Home from './pages/Home';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [auth, setAuth] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  useEffect(() => {
    axios.get('http://localhost:8000/', { withCredentials: true })
      .then(res => {
        if (res.data.status === "Success") {
          setAuth(true);
          
        } else {
          setAuth(false);
          
        }
      })
      .catch(err => {
        console.log(err);
        setAuth(false);
      });
  }, []);

  return (
    <div>
      {
        auth 
        ? 
        (
          <ClientDash setAuth={setAuth} />
        )
          : (
            <Home />
          )
      }
    </div>
  );
}

export default App;