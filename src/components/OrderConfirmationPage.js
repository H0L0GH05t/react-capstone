
import { Link, useLocation } from 'react-router-dom';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const orderTotal = location.state?.total || 'N/A';
  const orderedItems = location.state?.items || [];
  const orderId = Math.floor(Math.random() * 1000000); // random id for now

  return (
    <>
    <section className="hero-section">
        <div className="container">
            <div div className="hero-content">
                <h1>Order Placed</h1>
                <h2>Thank you!</h2>
            </div>
        </div>
    </section>
    <section className="order-confirmation-section">
      <div className="container order-confirmation-content-container">
        <div className="order-confirmation-card">
          <p className="order-success-message">
            Thank you for your order from Little Lemon! Your order has been placed successfully.
          </p>
          <p className="order-id">
            Your Order ID: <strong>#{orderId}</strong>
          </p>
          {orderedItems.length > 0 && (
            <div className="ordered-items-summary">
                <h4>Order Summary:</h4>
                <ul>
                    {orderedItems.map(item => (
                        <li key={item.id}>{item.name} x {item.quantity} - ${ (item.price * item.quantity).toFixed(2) }</li>
                    ))}
                </ul>
            </div>
          )}
          {orderTotal !== 'N/A' && (
            <p className="order-final-total">
              Order Total: <strong>${orderTotal.toFixed(2)}</strong>
            </p>
          )}
          <p>
            You will receive an email confirmation shortly with details about your delivery/pickup.
          </p>
          <div className="confirmation-actions">
            <Link to="/menu" className="btn btn-secondary">Order More Food</Link>
            <Link to="/" className="btn btn-primary">Back to Home</Link>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default OrderConfirmationPage;