import React from 'react';
import { Spinner } from 'react-bootstrap';
import './spinnerLoading.scss'

export const SpinnerLoading = () => {
  return (
    <div className='loading-box'>
      <Spinner animation='border' role='status' />
      <span>Loading</span>
    </div>
  );
};
