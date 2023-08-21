import React from 'react';
import { useAuth } from '../auth/AuthContext';

export default function Home() {
  const {
    user, setUser, authenticated, setAuthenticated,
  } = useAuth();
  const headers = {
    'Content-Type': 'application/json',
    withCredentials: true,
  };
  const logOut = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/logout', {
        method: 'DELETE',
        headers,
      });

      if (response.ok) {
        console.log('Logged out successfully');
        setUser(null);
        setAuthenticated(false);
        window.location.href = '/';
      } else {
        const errorData = await response.json();
        console.error('logout error:', errorData);
      }
    } catch (error) {
      console.error('logout error:', error);
    }
  };
  //  end logout method

  // eslint-disable-next-line no-return-assign
  return (
    <div>
      <nav>
        <button type="button" className="logout credentials" onClick={logOut}>Logout</button>
      </nav>
      { authenticated ? (
        <>
          <h1>Welcome to the Home Component</h1>
          <p>{user?.email}</p>
          <p>
            Logged in at:
            {user?.created_at}
          </p>
        </>
      )
        : (
          <p>{window.location.href = '/'}</p>
        )}
    </div>
  );
}
