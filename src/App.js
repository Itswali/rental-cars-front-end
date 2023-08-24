import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Splash from './components/Splash';
import Registration from './auth/Registration';
import Login from './auth/Login';
import Home from './components/Home';
import { AuthProvider } from './auth/AuthContext';
import AddItemForm from './action/additem';
import { useAuth } from './auth/AuthContext';

function App() {
  const { authenticated } = useAuth();

  return (
    <div className="App">
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
    </div>
  );
}

export default App;
