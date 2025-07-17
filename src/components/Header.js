import Nav from './Nav';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="site-header">
      <div className="container">
        <Link to="/" className="logo-link">
          <img src="/images/little-lemon-logo.jpg" alt="Little Lemon Logo" className="site-logo" />
          {/* <span className="site-logo-text">Little Lemon</span> */}
        </Link>
        <Nav />
      </div>
    </header>
  );
};

export default Header;