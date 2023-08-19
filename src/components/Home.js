import React from 'react';
import { useAuth } from '../auth/AuthContext';

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
    </div>
  );
}
