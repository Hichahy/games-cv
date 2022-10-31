import React from 'react';
import Home from '../home/Home';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Home', () => {
  it('should render Carousel', () => {
    render(<Home />);
    screen.getByTestId('carousel')
  });
});
