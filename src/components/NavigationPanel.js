/* eslint-disable no-console */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './super-wheels-logo.svg';

const NavigationPanel = (props) => {
  // eslint-disable-next-line react/prop-types
  const { setModalState } = props;
  const [navigationLinks, setNavigationLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const mobile = windowWidth < 768;

  const navRef = useRef();

  const handleNav = () => {
    navRef.current.classList.toggle('show-mobile-nav');
  };

  const location = useLocation();
  const activeNav = (path) => location.pathname === path;

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    fetch('https://supercars-73m2.onrender.com/api/v1/navigation_links')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setNavigationLinks(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error); // Set error state if fetch fails
        setLoading(false);
      });

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const openDialog = () => {
    setModalState(true);
  };

  const logOut = async () => {
    try {
      const response = await fetch('https://supercars-73m2.onrender.com/api/v1/logout', {
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
    <>
      {mobile && (
        <div className="hamburger-box">
          <div className="hamburger-box-logo">
            <img src={Logo} alt="Logo" />
          </div>
          <button type="button" className="hamburger" onClick={handleNav}>
            <i className="bi bi-list" />
          </button>
        </div>
      ) }

      <div ref={navRef} className="fixed-sidebar">
        <div className="brand">
          <img src={Logo} alt="Logo" />
          { mobile && (
            <div className="close-btn">
              <button type="button" onClick={handleNav}>
                <i className="bi bi-x" />
              </button>
            </div>
          )}
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
                      <Link
                        to={link.link}
                        onClick={handleNav}
                        className={activeNav(link.link) ? 'active-nav' : ''}
                      >
                        {link.name}
                      </Link>
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

    </>
  );
};

export default NavigationPanel;
