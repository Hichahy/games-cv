import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../login/Login';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Login', () => {
  it('should render Login', () => {
    render(
      <Router>
        <Login />
      </Router>
    );
  });

  it('should show email error', () => {
    render(
      <Router>
        <Login />
      </Router>
    );
    const input = screen.getByTestId('input-login-test');
    const button = screen.getByRole('button');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(button);
    expect(screen.getByTestId('error-login-test')).toBeInTheDocument();
    const span = screen.getByTestId('error-span');
    expect(span).toHaveTextContent('Wymagany email');
  });

  it('should show password error', () => {
    render(
      <Router>
        <Login />
      </Router>
    );
    const input = screen.getByTestId('input-login-test');
    const button = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'test@test.pl' } });
    fireEvent.click(button);
    expect(screen.getByTestId('error-login-test')).toBeInTheDocument();
    const span = screen.getByTestId('error-span');
    expect(span).toHaveTextContent('Wymagane hasło');
  });

  it('should redirect to register when click link', () => {
    render(
      <Router>
        <Login />,
      </Router>
    );
    const navlink = screen.getByTestId('input-login-redirect');
    fireEvent.click(navlink, { button: 0 });

    expect(navlink.closest('a')).toHaveAttribute('href', '/register');
  });

  //async Tests with send questions to API comment becouse to much login try :)

  // it('should show password error after wrong password login', async () => {
  //   render(
  //     <Router>
  //       <Login />
  //     </Router>
  //   );
  //   const input = screen.getByTestId('input-login-test');
  //   const password = screen.getByTestId('input-login-test-password');
  //   const button = screen.getByRole('button');

  //   fireEvent.change(input, { target: { value: 'teste@test.pl' } });
  //   fireEvent.change(password, { target: { value: 'yooloo' } });
  //   fireEvent.click(button);
  //   await waitFor(() => {
  //     expect(screen.getByTestId('error-login-test')).toBeInTheDocument();
  //     const span = screen.getByTestId('error-span');
  //     expect(span).toHaveTextContent('Nieprawidłowe hasło');
  //   });
  // });

  // it('should show password error after wrong email login', async () => {
  //   render(
  //     <Router>
  //       <Login />
  //     </Router>
  //   );
  //   const input = screen.getByTestId('input-login-test');
  //   const password = screen.getByTestId('input-login-test-password');
  //   const button = screen.getByRole('button');

  //   fireEvent.change(input, { target: { value: 'teste@LOLtest.pl' } });
  //   fireEvent.change(password, { target: { value: '111111' } });
  //   fireEvent.click(button);
  //   await waitFor(() => {
  //     expect(screen.getByTestId('error-login-test')).toBeInTheDocument();
  //     const span = screen.getByTestId('error-span');
  //     expect(span).toHaveTextContent('Nie znaleziono takiego użytkownika');
  //   });
  // });
});
