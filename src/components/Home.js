import React from 'react';
import { useAuth } from '../auth/AuthContext';
import NavigationPanel from './NavigationPanel';
import ItemsList from './ItemsList';

export default function Home() {
  const { user } = useAuth();

  return (
    <div>
      {user && (
      <div className="alert alert-warning alert-dismissible fade show" role="alert">
        <p>
          Welcome
          {' '}
          {user.email}
        </p>
      </div>
      )}
      <div className="home-layout">
        <NavigationPanel />
        <ItemsList />
      </div>
    </div>
  );
}
