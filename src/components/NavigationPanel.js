import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NavigationPanel = () => {
  // eslint-disable-next-line no-unused-vars
  const [navigationLinks, setNavigationLinks] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:3001/api/v1/navigation_links')
      .then((response) => response.json())
      .then((data) => setNavigationLinks(data));
  }, []);

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
