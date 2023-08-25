/* eslint-disable linebreak-style */
import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Splash from './components/Splash';
import Registration from './auth/Registration';
import Login from './auth/Login';
// eslint-disable-next-line import/no-named-as-default
import Home from './components/Home';
import AddItemForm from './action/additem';

function App() {
//  const { authenticated } = useAuth();

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Splash />} />
        <Route exact path="/registration" element={<Registration />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/add_item" element={<AddItemForm />} />

      </Routes>
    </div>
  );
}

export default App;
