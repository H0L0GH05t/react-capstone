import { Link } from 'react-router-dom';


// For now static data, but in a real app it should be fetched
const featuredSpecials = [
  {
    id: 1,
    name: "Greek Salad",
    price: "$12.99",
    description: "The famous Greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.",
    image: "/greek-salad.jpg"
  },
  {
    id: 2,
    name: "Bruschetta",
    price: "$7.99",
    description: "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil. Topped with tomato and basil.",
    image: "/bruschetta.jpg"
  },
  {
    id: 3,
    name: "Lemon Dessert",
    price: "$6.99",
    description: "This comes straight from grandma’s recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
    image: "/lemon-dessert.jpg"
  }
];

const HomePage = () => {
  return (
    <>
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

      <section className="specials-section">
        <div className="container">
          <div className="specials-header">
            <h2>This Week's Specials</h2>
            <Link to="/menu" className="btn btn-secondary">Online Menu</Link>
          </div>
          <div className="specials-grid">
            {featuredSpecials.map(special => (
              <Link to="/menu" key={special.id} className="special-card-link">
                <article className="special-card">
                  <img src={special.image} alt={special.name} className="special-img" />
                  <div className="card-content">
                    <h3>{special.name} <span className="special-price">{special.price}</span></h3>
                    <p>{special.description}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
      </>
  );
};

export default HomePage;