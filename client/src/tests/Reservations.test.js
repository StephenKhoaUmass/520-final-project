import React from 'react';
import { render } from '@testing-library/react';
import Reservations from './Reservations';

test('should render reservations with dummy data', () => {
  const { getByText } = render(<Reservations type="user" />);
  expect(getByText(/Reservation Details/i)).toBeInTheDocument();
  expect(getByText(/ABC123/i)).toBeInTheDocument(); // Confirmation ID from dummy data
  expect(getByText(/XYZ789/i)).toBeInTheDocument(); // Confirmation ID from dummy data
});

test('should render "No Reservations Yet" for empty data', () => {
  const { getByText } = render(<Reservations type="user" data={[]} />);
  expect(getByText(/No Reservations Yet/i)).toBeInTheDocument();
});

jest.mock('../useFetch', () => ({
  useFetch: (url) => ({
    data: url === '/reservations/user' ? [/* sample user reservations */] : [], // Mock user and potentially admin reservations
    loading: false,
  }),
}));

test('should render reservations from useFetch (user)', async () => {
  const { getByText } = render(<Reservations type="user" />);
  // Wait for data fetching to complete (if asynchronous)
  await new Promise((resolve) => setTimeout(resolve, 0));
  expect(getByText(/Reservation Details/i)).toBeInTheDocument();
  // Assertions about user reservations based on mocked data
});
