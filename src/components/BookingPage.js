import { useReducer, useEffect, useCallback } from 'react';
import BookingForm from './BookingForm';

const seededRandom = function (seed) {
    var m = 2**35 - 31;
    var a = 185852;
    var s = seed % m;
    return function () {
        return (s = s * a % m) / m;
    };
}

const fetchAPI = function(date) {
    let result = [];
    let random = seededRandom(date.getDate());

    for(let i = 17; i <= 23; i++) {
        if(random() < 0.5) {
            result.push(i + ':00');
        }
        if(random() < 0.5) {
            result.push(i + ':30');
        }
    }
    return result;
};

export const timesReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TIMES':
      // console.log("Updating times for date:", action.payload); // Debugging
        return fetchAPI(new Date(action.payload));
    case 'INITIALIZE_TIMES':
        // console.log("Initializing times for today."); // Debugging
        return fetchAPI(new Date());
    default:
      return state;
  }
};

const BookingPage = ({ submitForm }) => {
  const [availableTimes, dispatch] = useReducer(timesReducer, []);

  const updateTimes = useCallback((selectedDate) => {
    dispatch({ type: 'UPDATE_TIMES', payload: selectedDate });
  }, [dispatch]);

  useEffect(() => {
    updateTimes(new Date().toISOString().split('T')[0]);
  }, [updateTimes]);

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
        <BookingForm
          availableTimes={availableTimes}
          updateTimes={updateTimes}
          submitForm={submitForm}
        />
      </div>
    </section>
    </>
  );
};

export default BookingPage;