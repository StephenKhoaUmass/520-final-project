import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // For testing Link components
import Card from './Card';
import Navbar from './Navbar';
import ReservationCard from './ReservationCard';

test('should render card content', () => {
  const restaurant = {
    _id: '123',
    name: 'My Restaurant',
    location: '123 Main St',
    photo: 'https://example.com/image.jpg',
    rating: 4,
  };
  const { getByText, getByAltText } = render(<Card {...restaurant} />);
  expect(getByText(/My Restaurant/i)).toBeInTheDocument();
  expect(getByAltText(/restaurant/i)).toBeInTheDocument(); // Image alt text
  expect(getByText(/Rating:/i)).toBeInTheDocument();
});
