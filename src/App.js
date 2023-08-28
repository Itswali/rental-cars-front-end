/* eslint-disable jsx-a11y/no-static-element-interactions */
import './App.css';
import './styles/home.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Splash from './components/Splash';
import Registration from './auth/Registration';
import Login from './auth/Login';
import Home from './components/Home';
import { useAuth, AuthProvider } from './auth/AuthContext';
import Reservation from './components/Reservation';
import Reserve from './components/Reserve';
import AddItemForm from './action/additem';
import ItemsList from './components/ItemsList';
import Details from './components/Details'; // Import the Details component

function App() {
  const { authenticated } = useAuth();




  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route exact path="/registration" element={<Registration />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/home" element={<Home />}>
            <Route index element={<ItemsList />} />
            <Route path="add_item" element={<AddItemForm />} />
            <Route path="reserve" element={<Reserve />} />
            <Route path="reserve/:carParam" element={<Reserve />} />
            <Route path="my_reservations" element={<Reservation />} />
            {/* Add a nested route for item details */}
            <Route path="/home/details/:itemId" element={<Details />} />

          </Route>

          {/* Redirect based on authentication */}
          {authenticated ? (
            <Route path="/*" element={<Home />} />
          ) : (
            <Route path="*" element={<Splash />} />
          )}

          <Route exact path="/" element={<Splash />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
