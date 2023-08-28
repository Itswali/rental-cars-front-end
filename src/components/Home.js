import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import NavigationPanel from './NavigationPanel';
// import ItemsList from './ItemsList';

export default function Home() {
  const { authenticated } = useAuth();

  const navigate = useNavigate();

  if (!authenticated) {
    navigate('/');
    return null;
  }

  return (
    <div>
      <div className="home-layout">
        <div className="nav-div">
          <NavigationPanel />
        </div>
        <div className="routes-div">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
