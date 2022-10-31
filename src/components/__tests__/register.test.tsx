import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Register from '../register/Register';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Register', () => {
  it('should render Login', () => {
    render(
      <Router>
        <Register />,
      </Router>
    );
  });

  it('should show email error', () => {
    render(
      <Router>
        <Register />,
      </Router>
    );
    const input = screen.getByTestId('input-register-test');
    const button = screen.getByRole('button');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(button);
    expect(screen.getByTestId('error-register-test')).toBeInTheDocument();
    const span = screen.getByTestId('error-register-span');
    expect(span).toHaveTextContent('Wymagany email');
  });

  it('should show password error when password not this same', () => {
    render(
      <Router>
        <Register />,
      </Router>
    );
    const email = screen.getByTestId('input-register-test');
    const password = screen.getByTestId('input-register-test-password');
    const passwordConfirm = screen.getByTestId(
      'input-register-test-password-confirm'
    );
    const button = screen.getByRole('button');

    fireEvent.change(email, { target: { value: 'test@test.pl' } });
    fireEvent.change(password, { target: { value: 'password1' } });
    fireEvent.change(passwordConfirm, { target: { value: 'password2' } });
    fireEvent.click(button);

    expect(screen.getByTestId('error-register-test')).toBeInTheDocument();
    const span = screen.getByTestId('error-register-span');
    expect(span).toHaveTextContent('Hasła do siebie nie pasują');
  });

  it('should show error when checkbox is empy', () => {
    render(
      <Router>
        <Register />,
      </Router>
    );
    const email = screen.getByTestId('input-register-test');
    const password = screen.getByTestId('input-register-test-password');
    const passwordConfirm = screen.getByTestId(
      'input-register-test-password-confirm'
    );
    const button = screen.getByRole('button');

    fireEvent.change(email, { target: { value: 'test@test.pl' } });
    fireEvent.change(password, { target: { value: 'password1' } });
    fireEvent.change(passwordConfirm, { target: { value: 'password1' } });
    fireEvent.click(button);

    expect(screen.getByTestId('error-register-test')).toBeInTheDocument();
    const span = screen.getByTestId('error-register-span');
    expect(span).toHaveTextContent('Wymagana zgoda');
  });

  it('should redirect to login when click link', () => {
    render(
      <Router>
        <Register />,
      </Router>
    );
    const navlink = screen.getByTestId('input-register-redirect');
    fireEvent.click(navlink, { button: 0 });

    expect(navlink.closest('a')).toHaveAttribute('href', '/login')
  });
});
