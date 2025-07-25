import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './HomePage';
import BookingPage from './BookingPage';
import BookingConfirmation from './BookingConfirmation';
import MenuPage from './MenuPage';
import CartPage from './CartPage';
import OrderConfirmationPage from './OrderConfirmationPage';
import AboutPage from './AboutPage';

const submitAPI = function(formData) {
    return true;
};

const Main = ({ cartItems, addToCart, updateCartItemQuantity, removeCartItem, setCartItems }) => {
  const navigate = useNavigate();

  const submitForm = async (formData) => {
    if (typeof submitAPI !== 'function') {
      console.error('Error: submitAPI function is not available. API script might not be loaded or scoped correctly.');
      alert('Reservation submission service is not available. Please try again later.');
      return;
    }

    const isSubmitted = await submitAPI(formData);

    if (isSubmitted) {
      console.log('Form submitted successfully via API:', formData);
      navigate('/confirmation', { state: { bookingDetails: formData } });
    } else {
      console.error('Failed to submit form via API.');
      alert('Failed to submit reservation. Please try again.');
    }
  };

  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage submitForm={submitForm} />} />
        <Route path="/confirmation" element={<BookingConfirmation />} />
        <Route path="/menu" element={<MenuPage addToCart={addToCart} cartItems={cartItems} />} />
        <Route
          path="/cart"
          element={
            <CartPage
              cartItems={cartItems}
              updateCartItemQuantity={updateCartItemQuantity}
              removeCartItem={removeCartItem}
              setCartItems={setCartItems}
            />
          }
        />
        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </main>
  );
};

export default Main;