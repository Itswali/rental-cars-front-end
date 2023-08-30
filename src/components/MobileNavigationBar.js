import React, { useState } from 'react';
import NavigationPanel from './NavigationPanel';

const MobileNavigationBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={`mobile-navigation ${menuOpen ? 'open' : ''}`}>
      <button className="hamburger-button" onClick={toggleMenu} type="button">
        <i className="bi bi-list"></i>
      </button>
      {menuOpen && <NavigationPanel closeMenu={() => setMenuOpen(false)} />}
    </div>
  );
};

export default MobileNavigationBar;

