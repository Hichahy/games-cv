import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navigation from '../navigation/Navigation';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Navigation', () => {
  it('should render Login', () => {
    render(
      <Router>
        <Navigation />,
      </Router>
    );
  });

  it('should redirect to home when click link', () => {
    render(
      <Router>
        <Navigation />,
      </Router>
    );
    const navlink = screen.getByText('Główna');
    fireEvent.click(navlink);

    expect(navlink.closest('a')).toHaveAttribute('href', '/home')
  });

  it('should redirect to login when click link', () => {
    render(
      <Router>
        <Navigation />,
      </Router>
    );
    const navlink = screen.getByText('Logowanie');
    fireEvent.click(navlink);

    expect(navlink.closest('a')).toHaveAttribute('href', '/login')
  });

  it('should redirect to register when click link', () => {
    render(
      <Router>
        <Navigation />,
      </Router>
    );
    const navlink = screen.getByText('Rejestracja');
    fireEvent.click(navlink);

    expect(navlink.closest('a')).toHaveAttribute('href', '/register')
  });

  it('should redirect to games when click link', () => {
    render(
      <Router>
        <Navigation />,
      </Router>
    );
    const navlink = screen.getByText('Gry');
    fireEvent.click(navlink);

    expect(navlink.closest('a')).toHaveAttribute('href', '/games')
  });

  it('should redirect to home when click link', () => {
    render(
      <Router>
        <Navigation />,
      </Router>
    );
    const navlink = screen.getByText('🌯 Sajgonka');
    fireEvent.click(navlink);

    expect(navlink.closest('a')).toHaveAttribute('href', '/home')
  });
});
