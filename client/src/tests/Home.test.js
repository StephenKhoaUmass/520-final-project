import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import Home from './Home';
import { act } from '@testing-library/react'; 

jest.mock('../useFetch', () => ({
  useFetch: () => ({
    data: [
      { name: 'Restaurant A', location: '123 Main St' },
      { name: 'Restaurant B', location: '456 Elm St' },
    ],
    loading: false,
  }),
}));


test('should render search bar and Explore Restaurant title', () => {
  const { getByText, getByPlaceholderText } = render(<Home />);
  expect(getByText(/Explore Restaurant/i)).toBeInTheDocument();
  expect(getByPlaceholderText(/Search here for menu or items/i)).toBeInTheDocument();
});

test('should update search results on query change', async () => {
  const { getByText, getByPlaceholderText } = render(<Home />);
  const searchInput = getByPlaceholderText(/Search here for menu or items/i);
  await act(async () => fireEvent.change(searchInput, { target: { value: 'Restaurant B' } }));

  expect(getByText(/Restaurant B/i)).toBeInTheDocument();
  expect(getByText(/Restaurant A/i)).not.toBeInTheDocument(); // Not displayed in filtered results
});
