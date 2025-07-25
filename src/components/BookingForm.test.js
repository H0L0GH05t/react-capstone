import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingForm from './BookingForm';

// Mock the updateTimes and submitForm functions for testing purposes
const mockUpdateTimes = jest.fn();
const mockSubmitForm = jest.fn();

// Define some initial available times for the test
const mockAvailableTimes = ['17:00', '18:00', '19:00', '20:00'];

describe('BookingForm', () => {
  beforeEach(() => {
    // Clear mocks before each test to ensure tests are independent
    mockUpdateTimes.mockClear();
    mockSubmitForm.mockClear();
  });

  // Test Case 1: Renders all required form fields and the submit button
  test('renders all required form fields and the submit button', () => {
    render(
      <BookingForm
        availableTimes={mockAvailableTimes}
        updateTimes={mockUpdateTimes}
        submitForm={mockSubmitForm}
      />
    );

    // Check for labels/inputs
    expect(screen.getByLabelText(/Contact Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Preferred Contact Method/i)).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /Email/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Choose date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Choose time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Number of guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Occasion/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Special Requests/i)).toBeInTheDocument();

    // Check for the submit button
    expect(screen.getByRole('button', { name: /Make Your Reservation/i })).toBeInTheDocument();
  });

  // Test Case 2: Initial state of form fields
  test('initial state of form fields is correct', () => {
    render(
      <BookingForm
        availableTimes={mockAvailableTimes}
        updateTimes={mockUpdateTimes}
        submitForm={mockSubmitForm}
      />
    );

    expect(screen.getByLabelText(/Contact Name/i)).toHaveValue('');
    expect(screen.getByRole('radio', { name: /Email/i })).toBeChecked();
    expect(screen.getByLabelText(/Email Address/i)).toHaveValue('');
    expect(screen.getByLabelText(/Choose time/i)).toHaveValue(mockAvailableTimes[0]);
    expect(screen.getByLabelText(/Number of guests/i)).toHaveValue(1);
    expect(screen.getByLabelText(/Occasion/i)).toHaveValue('');
    expect(screen.getByLabelText(/Special Requests/i)).toHaveValue('');
    expect(screen.getByLabelText(/Choose date/i)).toBeInTheDocument();
  });

  // Test Case 3: User input for text fields
  test('allows user to input values into text fields', async () => {
    const user = userEvent.setup();
    render(
      <BookingForm
        availableTimes={mockAvailableTimes}
        updateTimes={mockUpdateTimes}
        submitForm={mockSubmitForm}
      />
    );

    const contactNameInput = screen.getByLabelText(/Contact Name/i);
    await user.type(contactNameInput, 'John Doe');
    expect(contactNameInput).toHaveValue('John Doe');

    const contactValueInput = screen.getByLabelText(/Email Address/i);
    await user.type(contactValueInput, 'john.doe@example.com');
    expect(contactValueInput).toHaveValue('john.doe@example.com');

    const specialRequestsTextarea = screen.getByLabelText(/Special Requests/i);
    await user.type(specialRequestsTextarea, 'Need a high chair');
    expect(specialRequestsTextarea).toHaveValue('Need a high chair');
  });

  // Test Case 4: User selects number of guests
  test('allows user to select number of guests', async () => {
    const user = userEvent.setup();
    render(
      <BookingForm
        availableTimes={mockAvailableTimes}
        updateTimes={mockUpdateTimes}
        submitForm={mockSubmitForm}
      />
    );

    const guestsInput = screen.getByLabelText(/Number of guests/i);
    await user.clear(guestsInput);
    await user.type(guestsInput, '5');
    expect(guestsInput).toHaveValue(5);
  });

  // Test Case 5: updateTimes is called on date change
  test('updateTimes is called when date input changes', async () => {
    const user = userEvent.setup();
    render(
      <BookingForm
        availableTimes={mockAvailableTimes}
        updateTimes={mockUpdateTimes}
        submitForm={mockSubmitForm}
      />
    );

    const dateInput = screen.getByLabelText(/Choose date/i);
    const testDate = '2025-12-25'; // Christmas Day

    fireEvent.change(dateInput, { target: { value: testDate } });


    // Await for updateTimes to be called
    await waitFor(() => {
      expect(mockUpdateTimes).toHaveBeenCalledTimes(1);
      expect(mockUpdateTimes).toHaveBeenCalledWith(testDate);
    });
  });

  // Test Case 6: Time slot updates when availableTimes changes (useEffect logic)
  test('time slot updates when availableTimes changes', async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <BookingForm
        availableTimes={mockAvailableTimes}
        updateTimes={mockUpdateTimes}
        submitForm={mockSubmitForm}
      />
    );

    const timeSelect = screen.getByLabelText(/Choose time/i);
    expect(timeSelect).toHaveValue('17:00');

    // Simulate changing availableTimes where the current time (17:00) is no longer available
    const newAvailableTimes = ['18:30', '19:00', '20:30'];
    rerender(
      <BookingForm
        availableTimes={newAvailableTimes}
        updateTimes={mockUpdateTimes}
        submitForm={mockSubmitForm}
      />
    );

    // The time select should automatically update to the first new available time
    await waitFor(() => {
        expect(timeSelect).toHaveValue('18:30');
    });

    // If a selected time is still available, it should remain selected
    const stableAvailableTimes = ['17:00', '18:00', '19:00'];
    rerender(
        <BookingForm
            availableTimes={stableAvailableTimes}
            updateTimes={mockUpdateTimes}
            submitForm={mockSubmitForm}
        />
    );
    await user.selectOptions(timeSelect, '18:00');
    expect(timeSelect).toHaveValue('18:00');

    // Rerender with available times that still include 18:00
    const stableAvailableTimes2 = ['17:00', '18:00', '20:00'];
    rerender(
        <BookingForm
            availableTimes={stableAvailableTimes2}
            updateTimes={mockUpdateTimes}
            submitForm={mockSubmitForm}
        />
    );
    await waitFor(() => {
        expect(timeSelect).toHaveValue('18:00');
    });
  });

  // Test Case 7: Contact preference toggles correctly
  test('contact preference changes label and input type', async () => {
    const user = userEvent.setup();
    render(
      <BookingForm
        availableTimes={mockAvailableTimes}
        updateTimes={mockUpdateTimes}
        submitForm={mockSubmitForm}
      />
    );

    // Should be Email Address at start
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toHaveAttribute('type', 'email');
    expect(screen.getByRole('radio', { name: /Email/i })).toBeChecked();

    // Click the Phone radio button
    const phoneRadio = screen.getByLabelText(/Phone/i);
    await user.click(phoneRadio);

    // Now it should be Phone Number
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toHaveAttribute('type', 'tel');
    expect(phoneRadio).toBeChecked();

    // Check placeholder changes
    expect(screen.getByPlaceholderText(/e.g., 123-456-7890/i)).toBeInTheDocument();

    // Click back to Email
    const emailRadio = screen.getByRole('radio', { name: /Email/i });
    await user.click(emailRadio);

    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toHaveAttribute('type', 'email');
    expect(emailRadio).toBeChecked();
  });
});