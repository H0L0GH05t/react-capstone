import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookingForm = () => {
    const navigate = useNavigate();

    // State variables for form fields
    const [date, setDate] = useState('');
    const [time, setTime] = useState('17:00');
    const [guests, setGuests] = useState(1);
    const [occasion, setOccasion] = useState('');
    const [contactName, setContactName] = useState('');
    const [contactPreference, setContactPreference] = useState('email');
    const [contactValue, setContactValue] = useState('');
    const [specialRequests, setSpecialRequests] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        alert('Reservation submitted!');
        // TODO: connect to given API endpoint
        const bookingDetails = {
            date,
            time,
            guests,
            occasion,
            contactName,
            contactPreference,
            contactValue,
            specialRequests,
        };

    console.log("Submitting booking:", bookingDetails); // For debugging
    // Simulate API call success
    setTimeout(() => { // Simulate network delay
      navigate('/confirmation', { state: { bookingDetails } });
    }, 500); // Wait 0.5 seconds before navigating
  };

  return (
    <form onSubmit={handleSubmit} className="booking-form">

      <label htmlFor="contact-name">Contact Name</label>
      <input
        type="text"
        id="contact-name"
        value={contactName}
        onChange={(e) => setContactName(e.target.value)}
        required
      />

      <fieldset className="contact-preference-group">
        <legend>Preferred Contact Method</legend>
        <div className="radio-group">
          <input
            type="radio"
            id="contact-email"
            name="contact-method"
            value="email"
            checked={contactPreference === 'email'}
            onChange={(e) => setContactPreference(e.target.value)}
          />
          <label htmlFor="contact-email">Email</label>

          <input
            type="radio"
            id="contact-phone"
            name="contact-method"
            value="phone"
            checked={contactPreference === 'phone'}
            onChange={(e) => setContactPreference(e.target.value)}
          />
          <label htmlFor="contact-phone">Phone</label>
        </div>
      </fieldset>

      <label htmlFor="contact-value">{contactPreference === 'email' ? 'Email Address' : 'Phone Number'}</label>
      <input
        type={contactPreference === 'email' ? 'email' : 'tel'}
        pattern={contactPreference === 'email' ? '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$' : "[0-9]{3}-[0-9]{3}-[0-9]{4}|[0-9]{10}"}
        id="contact-value"
        value={contactValue}
        onChange={(e) => setContactValue(e.target.value)}
        placeholder={contactPreference === 'email' ? 'your.email@example.com' : 'e.g., 123-456-7890'}
        required
      />

      <label htmlFor="res-date">Choose date</label>
      <input
        type="date"
        id="res-date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <label htmlFor="res-time">Choose time</label>
      <select
        id="res-time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
      >
        <option value="17:00">17:00</option>
        <option value="18:00">18:00</option>
        <option value="19:00">19:00</option>
        <option value="20:00">20:00</option>
        <option value="21:00">21:00</option>
        <option value="22:00">22:00</option>
      </select>

      <label htmlFor="guests">Number of guests</label>
      <input
        type="number"
        placeholder="1"
        min="1"
        max="10"
        id="guests"
        value={guests}
        onChange={(e) => setGuests(parseInt(e.target.value))}
        required
      />

      <label htmlFor="occasion">Occasion (Optional)</label>
      <select
        id="occasion"
        value={occasion}
        onChange={(e) => setOccasion(e.target.value)}
      >
        <option value="">Select an Occasion</option>
        <option>Birthday</option>
        <option>Anniversary</option>
        <option>Other</option>
      </select>

      <label htmlFor="special-requests">Special Requests (Optional)</label>
      <textarea
        id="special-requests"
        rows="4"
        value={specialRequests}
        onChange={(e) => setSpecialRequests(e.target.value)}
        placeholder="e.g., high chair needed, dietary restrictions, specific table..."
      ></textarea>

      <input type="submit" value="Make Your Reservation" className="btn btn-primary" />
    </form>
  );
};

export default BookingForm;