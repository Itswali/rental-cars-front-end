import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NavigationPanel = () => {
  // eslint-disable-next-line no-unused-vars
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
    <nav>
      <ul>
        {
          navigationLinks?.map((link) => (
            <li key={link.name}>
              <Link to={link.link} className="credentials">{link.name}</Link>
            </li>
          ))
        }
      </ul>
    </nav>
  );
};

export default NavigationPanel;
