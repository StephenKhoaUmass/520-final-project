import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // For testing Link components
import Card from './Card';
import Navbar from './Navbar';
import ReservationCard from './ReservationCard';

test('should render navigation links for logged-in user', () => {
  const { getByText } = render(<Navbar user={true} />);
  expect(getByText(/Home/i)).toBeInTheDocument();
  expect(getByText(/Reservations/i)).toBeInTheDocument();
  expect(getByText(/Contact Us/i)).toBeInTheDocument();
});

test('should render navigation links for non-logged-in user', () => {
  const { getByText } = render(<Navbar user={false} />);
  expect(getByText(/Reservations/i)).toBeInTheDocument();
  expect(getByText(/Contact Us/i)).toBeInTheDocument();
  expect(getByText(/Home/i)).not.toBeInTheDocument(); // Not displayed for non-logged-in user
});

test('should toggle reservation dropdown on button click', () => {
  const { getByText } = render(<Navbar user={true} />);
  const reservationButton = getByText(/Reservations/i);
  fireEvent.click(reservationButton);
  expect(getByText(/Create/i)).toBeInTheDocument();
  expect(getByText(/Manage/i)).toBeInTheDocument();
});

