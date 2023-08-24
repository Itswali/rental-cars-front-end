/* eslint-disable linebreak-style */
import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Splash from './components/Splash';
import Registration from './auth/Registration';
import Login from './auth/Login';
import Home from './components/Home';
<<<<<<< HEAD
import { useAuth } from './auth/AuthContext';
=======
import { AuthProvider } from './auth/AuthContext';
import AddItemForm from './action/additem';
>>>>>>> item-list

function App() {
  const { authenticated } = useAuth();

  return (
    <div className="App">
<<<<<<< HEAD
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
      </Routes>
=======
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Splash />} />
            <Route exact path="/registration" element={<Registration />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/add_item" element={<AddItemForm />} />

          </Routes>
        </BrowserRouter>
      </AuthProvider>
>>>>>>> item-list
    </div>
  );
}

export default App;
