import { useState } from 'react';
import Nav from './Nav';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
    console.log("Nav toggled:", !isNavOpen);
  };

  return (
    <header className="site-header">
      <div className="container">
        <Link to="/" className="logo-link" onClick={() => setIsNavOpen(false)}>
          <img src="little-lemon-logo.jpg" alt="Little Lemon Logo" className="site-logo" />
        </Link>

        <button
          className={isNavOpen ? 'hamburger-menu active' : 'hamburger-menu'}
          onClick={toggleNav}
          aria-expanded={isNavOpen}
          type="button">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </button>

        <Nav isNavOpen={isNavOpen} toggleNav={toggleNav} />
      </div>
    </header>
  );
};

export default Header;