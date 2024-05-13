import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReservationCard from './ReservationCard';
import axios from 'axios'; // Assuming axios is mocked for testing

jest.mock('axios'); // Mock axios for controlled behavior

test('should render reservation details', () => {
  const reservation = {
    _id: '123',
    confirmationId: 'ABC123',
    date: '2024-05-13T00:00:00.000Z',
    slot: '12:00 PM',
    people: 2,
    email: 'test@example.com',
    type: 'User',
  };
  const { getByText } = render(<ReservationCard props={reservation} />);
  expect(getByText(/Reservation Id: ABC123/i)).toBeInTheDocument();
  expect(getByText(/Date: 2024-05-13/i)).toBeInTheDocument();
  expect(getByText(/Time: 12:00 PM/i)).toBeInTheDocument();
  expect(getByText(/People: 2/i)).toBeInTheDocument();
  expect(getByText(/Email: test@example.com/i)).toBeInTheDocument();
});

test('should not render trash icon for non-user reservations', () => {
  const reservation = {
    _id: '123',
    confirmationId: 'ABC123',
    date: '2024-05-13T00:00:00.000Z',
    slot: '12:00 PM',
    people: 2,
    email: 'test@example.com',
    type: 'Admin', // Not a user reservation
  };
  const { queryByTestId } = render(<ReservationCard props={reservation} />);
  expect(queryByTestId('trash-icon')).toBeNull(); // No trash icon element found
});

test('should call axios.delete on trash icon click', async () => {
  const reservation = {
    _id: '123',
    confirmationId: 'ABC123',
    // ... other reservation details
    type: 'User',
  };
  const mockAxiosDelete = jest.fn().mockResolvedValue({});
  axios.delete.mockImplementation(mockAxiosDelete);
  const { getByTestId } = render(<ReservationCard props={reservation} />);
  const trashIcon = getByTestId('trash-icon'); // Assuming you have a data-testid for the icon
  fireEvent.click(trashIcon);
  expect(mockAxiosDelete).toHaveBeenCalledWith(`http://localhost:5050/api/reservations/${reservation._id}`, { withCredentials: false });
});

// Consider adding a test to verify window.location.reload() is called after successful deletion (if applicable)
