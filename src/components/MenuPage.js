
// Static data for now, but in a real app it should be fetched
const fullMenu = [
  {
    id: 1,
    name: "Greek Salad",
    price: 12.99,
    description: "The famous Greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.",
    image: "greek-salad.jpg"
  },
  {
    id: 2,
    name: "Bruschetta",
    price: 7.99,
    description: "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil. Topped with tomato and basil.",
    image: "bruschetta.jpg"
  },
  {
    id: 3,
    name: "Lemon Dessert",
    price: 6.99,
    description: "This comes straight from grandma’s recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
    image: "lemon-dessert.jpg"
  },
  {
    id: 4,
    name: "Pasta",
    price: 18.99,
    description: "Classic pasta with fresh tomato sauce, basil, and Parmesan cheese. A timeless Italian favorite.",
    image: "pasta.jpg"
  },
  {
    id: 5,
    name: "Grilled Fish",
    price: 20.00,
    description: "Perfectly grilled fish fillet with seasonal vegetables and lemon-dill sauce.",
    image: "salmon.jpg"
  },
  {
    id: 6,
    name: "Moussaka",
    price: 18.75,
    description: "Traditional Greek casserole with layers of spiced ground meat, eggplant, and béchamel sauce.",
    image: "moussaka.jpg"
  }
];


const MenuPage = ({ addToCart, cartItems }) => {

  return (
    <section className="full-menu-section">
      <div className="menu-header-hero">
        <div className="container">
          <h1>Menu</h1>
          <h2>Add to cart to order online!</h2>
        </div>
      </div>
      <div className="container menu-grid-container">
        <div className="menu-grid">
          {fullMenu.map(item => {
            const itemInCart = cartItems.find(cartItem => cartItem.id === item.id);

            return (
              <article key={item.id} className="menu-card special-card">
                <img src={item.image} alt={item.name} className="menu-img special-img" />
                <div className="card-content">
                  <h3>{item.name} <span className="menu-price special-price">${item.price.toFixed(2)}</span></h3>
                  <p>{item.description}</p>
                  <div className="menu-card-actions">
                    {itemInCart ? (
                      <>
                        <button
                          className="btn remove-item-btn">
                          Item in Cart
                        </button>
                      </>
                    ) : (
                      <button
                        className="btn btn-tertiary"
                        onClick={() => addToCart(item)}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MenuPage;