
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <section className="about-section">
      <div className="container hero-section">
          <div className="hero-content about-hero">
            <h1 className="about-title">About Us</h1>
          </div>
          <div className="hero-image"></div>
        </div>
        <div className="container about-content-wrapper">
          <div className="about-text">
            <p>
                Little Lemon is a charming neighborhood bistro that serves simple food
                and classic cocktails in a lively but casual environment. The restaurant
                features a locally sourced menu with daily specials.
            </p>
            <p>
                Founded by brothers Adrian and Mario, Little Lemon quickly became a beloved
                spot for locals, known for its warm ambiance and innovative Mediterranean dishes.
                Their passion for fresh ingredients and traditional flavors, combined with
                a modern culinary approach, is evident in every dish.
            </p>
            </div>
            <div className="about-images">
            <img src="about-img.jpg" alt="Mediterranean Cusine" className="about-img" />
          </div>
        </div>
    </section>
  );
};

export default AboutPage;