import { useLocation, Link } from 'react-router-dom';
const BookingConfirmation = () => {
  const location = useLocation();
  const bookingDetails = location.state?.bookingDetails;
  return (
    <section className="confirmation-section">
      <div className="container">
        <h2>Your Reservation is Confirmed!</h2>
        <p className="confirmation-message">
          Thank you for your reservation at Little Lemon. We look forward to seeing you!
        </p>

        {bookingDetails && (
          <div className="booking-details-summary">
            <h3>Your Reservation Details:</h3>
            <p><strong>Date:</strong> {bookingDetails.date}</p>
            <p><strong>Time:</strong> {bookingDetails.time}</p>
            <p><strong>Guests:</strong> {bookingDetails.guests}</p>
            {bookingDetails.occasion && <p><strong>Occasion:</strong> {bookingDetails.occasion}</p>}
            <p><strong>Name:</strong> {bookingDetails.contactName}</p>
            <p><strong>Contact:</strong> {bookingDetails.contactValue}</p>
            {bookingDetails.specialRequests && <p><strong>Special Requests:</strong> {bookingDetails.specialRequests}</p>}
          </div>
        )}

        <div className="confirmation-actions">
          <Link to="/" className="btn btn-secondary">Back to Home</Link>
          {/* TODO: Add link to view/manage booking in future */}
        </div>
      </div>
    </section>
  );
};

export default BookingConfirmation;