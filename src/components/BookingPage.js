import BookingForm from './BookingForm';

const BookingPage = () => {
  return (
    <>
    <section className="hero-section">
      <div className="container">
        <div className="hero-content">
          <h1>Reserve a Table</h1>
          <h2>Please enter your info below</h2>
        </div>
        <div className="hero-image">
            <img
              src="reserve-table.jpg"
              alt="Table reservation"
              className="hero-img"
            />
        </div>
      </div>
    </section>
    <section className="booking-section">
      <div className="container booking-form-container">
        <BookingForm />
      </div>
    </section>
    </>
  );
};

export default BookingPage;