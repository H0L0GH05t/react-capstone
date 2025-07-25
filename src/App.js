import { useState } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';

function App() {

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (itemToAdd) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === itemToAdd.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...itemToAdd, quantity: 1 }];
      }
    });
  };

  const updateCartItemQuantity = (id, change) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeCartItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };


  return (
    <Router>
      <Header cartItems={cartItems} />
      <Main
        cartItems={cartItems}
        addToCart={addToCart}
        updateCartItemQuantity={updateCartItemQuantity}
        removeCartItem={removeCartItem}
        setCartItems={setCartItems}
      />
      <Footer />
    </Router>
  );
}

export default App;