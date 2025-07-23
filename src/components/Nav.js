import { Link } from 'react-router-dom';

const Nav = ({ isNavOpen, toggleNav }) => {
  return (
    <nav  className={`site-nav ${isNavOpen ? 'nav-open' : ''}`}>
      <ul>
        <li><Link to="/" onClick={toggleNav}>Home</Link></li>
        <li><Link to="/booking" onClick={toggleNav}>Reservations</Link></li>
        <li><Link to="/about" onClick={toggleNav}>About</Link></li>
        <li><a href="/menu" onClick={toggleNav}>Menu</a></li>
      </ul>
    </nav>
  );
};

export default Nav;