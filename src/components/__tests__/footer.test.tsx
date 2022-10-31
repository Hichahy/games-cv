import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../footer/Footer';

describe('Render Footer', () => {
  it('should render Foter', () => {
    render(<Footer />);
  });
});
