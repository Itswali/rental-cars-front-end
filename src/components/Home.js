import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import NavigationPanel from './NavigationPanel';
import MobileNavigationBar from './MobileNavigationBar';

export default function Home() {
  const { authenticated } = useAuth();
  const navigate = useNavigate();
  const [modalState, setModalState] = useState(false);

  if (!authenticated) {
    navigate('/');
    return null;
  }

  const closeDialog = (e) => {
    if (e.target === e.currentTarget) {
      setModalState((prev) => !prev);
      navigate('/home');
    }
  };

  return (
    <div className="container">
      <MobileNavigationBar />
      {
        modalState
          ? <DeleteDialog closeDialog={(e) => closeDialog(e)} />
          : (
            <div className="home-layout">
              <div className="nav-div">
                <NavigationPanel setModalState={setModalState} />
              </div>
              <div className="routes-div">
                <Outlet />
              </div>
            </div>
          )
      }
    </div>
  );
}
