import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Splash from './components/Splash';
import Registration from './auth/Registration';
import Login from './auth/Login';
import Home from './components/Home';
import { useAuth } from './auth/AuthContext';
import Reservation from './components/Reservation';
import Reserve from './components/Reserve';

function App() {
  const { authenticated } = useAuth();

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Splash />} />
        <Route exact path="/registration" element={<Registration />} />
        <Route exact path="/login" element={<Login />} />

        {
                      authenticated ? (
                        <Route exact path="/*" element={<Home />} />
                      ) : (
                        <Route exact path="*" element={<Splash />} />
                      )
        }
        <Route exact path="/reserve" element={<Reserve />} />
        <Route exact path="/reserve/:carParam" element={<Reserve />} />
        <Route exact path="/reservations" element={<Reservation />} />
      </Routes>
    </div>
  );
}

export default App;
