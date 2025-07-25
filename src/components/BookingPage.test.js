import { render, screen, waitFor } from '@testing-library/react';
import BookingPage, { timesReducer } from './BookingPage';

const mockSubmitForm = jest.fn();

describe('BookingPage', () => {
  beforeEach(() => {
    mockSubmitForm.mockClear();
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2025, 6, 25));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  // Test Case 1: Renders the BookingForm component
  test('renders the BookingForm component', () => {
    render(<BookingPage submitForm={mockSubmitForm} />);
    expect(screen.getByTestId('booking-form')).toBeInTheDocument();
    expect(screen.getByLabelText(/Contact Name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Make Your Reservation/i })).toBeInTheDocument();
  });

  // Test Case 2: Checks that updateTimes is called on first render
  test('updateTimes (dispatch) is called on first render to initialize times', async () => {

    render(<BookingPage submitForm={mockSubmitForm} />);

    await waitFor(() => {
      const options = screen.getAllByRole('option');
      expect(options.length).toBeGreaterThan(1);
    });
  });
});