import React from 'react';
import { Link } from 'react-router-dom';

export default function Splash() {
  return (
    <div className="splash">
      <img src="logo.png" alt="vespa img" />
      <Link to="/registration" className="credentials">
        Sign Up
      </Link>
      <Link to="/login" className="credentials">
        Log In
      </Link>

    </div>

  );
}
