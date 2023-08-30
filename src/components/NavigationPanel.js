/* eslint-disable no-console */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from './super-wheels-logo.svg';

const NavigationPanel = (props) => {
  // eslint-disable-next-line react/prop-types
  const { setModalState } = props;
  const [navigationLinks, setNavigationLinks] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    fetch('http://127.0.0.1:3001/api/v1/navigation_links')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setNavigationLinks(data);
        setLoading(false); // Data has been loaded
      })
      .catch((error) => {
        setError(error); // Set error state if fetch fails
        setLoading(false); // Loading is complete (with error)
      });
  }, []);
  const openDialog = () => {
    setModalState(true);
  };

  const logOut = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/logout', {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Logged out successfully');
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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <p>
        Error:
        {error.message}
      </p>
    );
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className="fixed-sidebar">
      <div className="brand">
        <img src={Logo} alt="Logo" />
      </div>

      <ul className="menu-list">
        {navigationLinks?.map((link) => (
          <li key={link.name}>
            <h3>
              {link.name === 'Sign Out' ? (
                <Link to={link.link} onClick={logOut}>
                  {link.name}
                </Link>
              )
                : link.name === 'Delete Car' ? (
                  <Link to={link.link} onClick={openDialog}>
                    {link.name}
                  </Link>
                )
                  : (
                    <Link to={link.link}>{link.name}</Link>
                  )}
            </h3>
          </li>
        ))}
      </ul>

      <div className="footer">
        <div className="socials">
          <i className="bi bi-twitter" />
          <i className="bi bi-facebook" />
          <i className="bi bi-linkedin" />
          <i className="bi bi-github" />
          <i className="bi bi-instagram" />
        </div>
        <br />
        <small>
          © 2023 SUPER WHEELS CAR RENTALS.
          <br />
          ALL RIGHTS RESERVED.
        </small>
      </div>
    </div>
  );
};

export default NavigationPanel;
