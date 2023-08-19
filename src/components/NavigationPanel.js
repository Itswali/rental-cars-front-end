import React, { useState, useEffect } from 'react';

const NavigationPanel = () => {
  const [navigationLinks, setNavigationLinks] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:3000//api/v1/navigation_links')
      .then((response) => response.json())
      .then((data) => setNavigationLinks(data));
  }, []);

  return (
    <nav>
      <ul>
        {navigationLinks.map((link) => (
          <li key={link.name}>
            <a href={link.link}>{link.name}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavigationPanel;
