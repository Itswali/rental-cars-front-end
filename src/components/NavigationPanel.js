import React, { useState, useEffect } from 'react';

const NavigationPanel = () => {
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
    <div className="fixed-sidebar">
      <div className="brand">
        <img src="super-wheels-logo.png" alt="Logo" />
      </div>

      <ul className="menu-list">
        {navigationLinks.map((link) => (
          <li key={link.name}>
            <h3><a href={link.link}>{link.name}</a></h3>
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
