import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // For testing Link component
import Confirmation from './Confirmation';
import { useNavigate } from 'react-router-dom'; // Assuming useNavigate is mocked

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

test('should render confirmation form', () => {
  const { getByText, getByPlaceholderText } = render(<Confirmation />);
  expect(getByText(/Enter your Confirmation Id or Email for reservation details/i)).toBeInTheDocument();
  expect(getByPlaceholderText(/Enter Confirmation Id/i)).toBeInTheDocument();
  expect(getByPlaceholderText(/Enter Email/i)).toBeInTheDocument();
});

test('should navigate to reservations on submit click', () => {
  const mockNavigate = jest.fn();
  useNavigate.mockReturnValue(mockNavigate);
  const { getByText } = render(<Confirmation />);
  const submitButton = getByText(/Submit/i);
  fireEvent.click(submitButton);
  expect(mockNavigate).toHaveBeenCalledWith('/reservations');
});
