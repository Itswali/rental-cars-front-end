import './App.css';
import './home.css';
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Splash from './components/Splash';
import Registration from './auth/Registration';
import Login from './auth/Login';
import Home from './components/Home';
import { useAuth, AuthProvider } from './auth/AuthContext';
import Reservation from './components/Reservation';
import Reserve from './components/Reserve';

import AddItemForm from './action/additem';

function App() {
  const { authenticated } = useAuth();
  useEffect(() => {

  }, []);
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/registration" element={<Registration />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/add_item" element={<AddItemForm />} />
            <Route exact path="/" element={<Splash />} />

            <Route exact path="/reserve" element={<Reserve />} />
            <Route exact path="/reserve/:carParam" element={<Reserve />} />
            <Route exact path="/reservations" element={<Reservation />} />

            {
              authenticated ? (
                <Route exact path="/*" element={<Home />} />
              ) : (
                <Route exact path="*" element={<Splash />} />
              )
            }

          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
