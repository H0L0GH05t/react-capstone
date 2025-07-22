import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1>Little Lemon</h1>
            <h2>Chicago</h2>
            <p>
              We are a family-owned Mediterranean restaurant, focused on
              traditional recipes served with a modern twist.
            </p>
            <Link to="/booking" className="btn btn-primary">
              Reserve a Table
            </Link>
          </div>
          <div className="hero-image">
            <img
              src="restaurant-food.jpg"
              alt="Delicious restaurant food"
              className="hero-img"
            />
          </div>
        </div>
      </section>
  );
};

export default HomePage;