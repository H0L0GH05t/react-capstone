
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Receive props from App.js
const CartPage = ({ cartItems, updateCartItemQuantity, removeCartItem, setCartItems }) => {
  const navigate = useNavigate();

  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  useEffect(() => {
    setAppliedDiscount(0);
    setDiscountCode('');
  }, [cartItems]);

  const goBack = () => {
    navigate(-1);
  };

  const applyDiscount = () => {
    if (discountCode.toLowerCase() === 'lemon20') {
      setAppliedDiscount(20);
      alert('Discount "LEMON20" applied! $20 off your order.');
    } else if (discountCode.toLowerCase() === 'first10') {
      const discountAmount = subtotal * 0.10;
      setAppliedDiscount(discountAmount);
      alert('Discount "FIRST10" applied! 10% off your order.');
    }
    else {
      setAppliedDiscount(0);
      alert('Invalid or expired discount code.');
    }
  };


  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const taxRate = 0.08;
  const tax = subtotal * taxRate;
  let total = subtotal + tax - appliedDiscount;
  if (total < 0) total = 0;

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty! Please add items before placing an order.");
      return;
    }
    navigate('/order-confirmation', { state: { total: total, items: cartItems } });
    setCartItems([]);
  };


  return (
    <section className="cart-section">
      <div className="cart-header-hero">
        <div className="container">
          <h2>Your Cart</h2>
        </div>
      </div>

      <div className="container cart-content-container">
        {cartItems.length === 0 ? (
          <p className="empty-cart-message">Your cart is empty. <Link to="/menu">Browse our menu!</Link></p>
        ) : (
          <>
            <div className="cart-summary-wrapper">
              <div className="cart-items">
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item-card">
                    <img src={item.image} alt={item.name} className="cart-item-img" />
                    <div className="cart-item-details">
                      <h4>{item.name}</h4>
                      <p>Price: ${item.price}</p>
                      <div className="quantity-controls">
                        <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
                        <button onClick={() => updateCartItemQuantity(item.id, -1)} disabled={item.quantity === 1}>-</button>
                        <input
                          type="number"
                          id={`quantity-${item.id}`}
                          value={item.quantity}
                          onChange={(e) => updateCartItemQuantity(item.id, (parseInt(e.target.value) || 1) - item.quantity)}
                          min="1"
                          className="quantity-input"
                        />
                        <button onClick={() => updateCartItemQuantity(item.id, 1)}>+</button>
                      </div>
                      <p>Item Total: ${(item.price * item.quantity).toFixed(2)}</p>
                      <button onClick={() => removeCartItem(item.id)} className="remove-item-btn">Remove</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-summary">
                <h3>Order Summary</h3>
                <p>Subtotal: <span>${subtotal.toFixed(2)}</span></p>
                <p>Tax ({taxRate * 100}%): <span>${tax.toFixed(2)}</span></p>
                {appliedDiscount > 0 && <p className="discount-line">Discount: <span>-${appliedDiscount.toFixed(2)}</span></p>}
                <p className="order-total">Total: <span>${total.toFixed(2)}</span></p>

                <div className="discount-box">
                  <label htmlFor="discount-code">Discount Code (Optional):</label>
                  <div className="discount-input-group">
                    <input
                      type="text"
                      id="discount-code"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      placeholder="Enter code"
                    />
                    <button onClick={applyDiscount} className="btn btn-tertiary apply-discount-btn">Apply</button>
                  </div>
                </div>

                <button onClick={handlePlaceOrder} className="btn btn-primary place-order-btn">
                  Place Order
                </button>
              </div>
            </div>
            <button onClick={goBack} className="btn btn-secondary back-button">
              &larr; Back to Menu
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default CartPage;