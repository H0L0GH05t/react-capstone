import { useState } from 'react';
import Nav from './Nav';
import { Link,  useLocation } from 'react-router-dom';

const Header = ({ cartItems }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
    // console.log("Nav toggled:", !isNavOpen); // For debugging
  };

  const showCartIcon = location.pathname === '/menu';

  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

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

        <div className="nav-and-cart-wrapper">
          <Nav isNavOpen={isNavOpen} toggleNav={toggleNav} />
          {showCartIcon && (
            <Link to="/cart" className="cart-icon-link">
              <img src="cart-icon.png" alt="Shopping Cart" className="cart-icon" />
              {totalCartItems > 0 && <span className="cart-count">{totalCartItems}</span>} {/* Only show count if > 0 */}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;