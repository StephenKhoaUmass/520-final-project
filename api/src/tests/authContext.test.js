import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { AuthContextProvider } from './authContext'; // Assuming your file path

test('should render initial state', () => {
  const { getByText } = render(<AuthContextProvider />);
  expect(getByText(/loading/i)).not.toBeInTheDocument(); // Not initially loading
  expect(getByText(/error/i)).not.toBeInTheDocument(); // No initial error
});

test('should dispatch LOGIN_START on login', () => {
  const mockDispatch = jest.fn();
  const { getByText } = render(
    <AuthContextProvider>
      <button onClick={() => mockDispatch({ type: 'LOGIN_START' })}>Login</button>
    </AuthContextProvider>
  );
  fireEvent.click(getByText(/Login/i));
  expect(mockDispatch).toHaveBeenCalledWith({ type: 'LOGIN_START' });
});

test('should update state on LOGIN_SUCCESS', () => {
  const mockDispatch = jest.fn();
  const { getByText } = render(
    <AuthContextProvider>
      <button onClick={() => mockDispatch({ type: 'LOGIN_SUCCESS', payload: { name: 'John Doe' } })}>Login</button>
    </AuthContextProvider>
  );
  fireEvent.click(getByText(/Login/i));
  expect(mockDispatch).toHaveBeenCalledWith({ type: 'LOGIN_SUCCESS', payload: { name: 'John Doe' } });
  expect(getByText(/John Doe/i)).toBeInTheDocument(); // Username should be displayed after successful login
});

test('should dispatch LOGOUT on logout', () => {
  const mockDispatch = jest.fn();
  const { getByText } = render(
    <AuthContextProvider>
      <button onClick={() => mockDispatch({ type: 'LOGOUT' })}>Logout</button>
    </AuthContextProvider>
  );
  fireEvent.click(getByText(/Logout/i));
  expect(mockDispatch).toHaveBeenCalledWith({ type: 'LOGOUT' });
});

test('should update state on LOGIN_FAILURE', () => {
  const mockDispatch = jest.fn();
  const { getByText } = render(
    <AuthContextProvider>
      <button onClick={() => mockDispatch({ type: 'LOGIN_FAILURE', payload: 'Login failed' })}>Login</button>
    </AuthContextProvider>
  );
  fireEvent.click(getByText(/Login/i));
  expect(mockDispatch).toHaveBeenCalledWith({ type: 'LOGIN_FAILURE', payload: 'Login failed' });
  expect(getByText(/Login failed/i)).toBeInTheDocument(); // Error message should be displayed
});
