/* eslint-disable linebreak-style */
import React from 'react';
import { useAuth } from '../auth/AuthContext';
import NavigationPanel from './NavigationPanel';
import ItemsList from './ItemsList';

export default function Home() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Welcome to the Home Component</h1>
      {user && (
      <div>
        <p>
          Email:
          {user.email}
        </p>

      </div>
      )}
      <NavigationPanel />
      <ItemsList />
    </div>
  );
}
