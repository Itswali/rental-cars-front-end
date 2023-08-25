import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import NavigationPanel from './NavigationPanel';
import ItemsList from './ItemsList';

export default function Home() {
  const {
    user, setUser, authenticated, setAuthenticated,
  } = useAuth();
  const headers = {
    'Content-Type': 'application/json',
    withCredentials: true,
  };

  const history = useHistory();

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
        // window.location.href = '/';
        history.push('/');
      } else {
        const errorData = await response.json();
        console.error('logout error:', errorData);
      }
    } catch (error) {
      console.error('logout error:', error);
    }
  };

  if (!authenticated) {
    history.push('/');
    return null;
  }

  return (
    <div>
      <nav>
        <button type="button" className="logout credentials" onClick={logOut}>Logout</button>
      </nav>
      <Link to="/reserve">Reserve</Link>

      <h1>Welcome to the Home Component</h1>
      <p>{user?.email}</p>
      <p>
        Logged in at:
        {user?.created_at}
      </p>

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
