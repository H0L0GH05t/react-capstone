import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';

import HomePage from './components/HomePage';
import BookingPage from './components/BookingPage';
import AboutPage from './components/AboutPage';
import BookingConfirmation from './components/BookingConfirmation';
import MenuPage from './components/MenuPage';
import CartPage from './components/CartPage';
import OrderConfirmationPage from './components/OrderConfirmationPage';

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
      <Main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/confirmation" element={<BookingConfirmation />} />
          <Route path="/menu" element={<MenuPage addToCart={addToCart} cartItems={cartItems} />} />
          <Route
            path="/cart"
            element={
                <CartPage
                  cartItems={cartItems}
                  updateCartItemQuantity={updateCartItemQuantity}
                  removeCartItem={removeCartItem}
                  setCartItems={setCartItems} // Pass setCartItems for discount reset or full clear
                />
              }
          />
          <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Main>
      <Footer />
    </Router>
  );
}

export default App;