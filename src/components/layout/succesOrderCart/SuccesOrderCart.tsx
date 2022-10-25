import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import './succesOrderCart.scss';

interface IProps {
  rentComplete: boolean;
  mobileMode: boolean;
  setRentComplete: (value: boolean) => void
}

export const SuccesOrderCart = ({ rentComplete, mobileMode, setRentComplete }: IProps) => {
  const [counter, setCounter] = useState(10);

  // scroll up when end but only in mobile mode
  useEffect(() => {
    if (mobileMode && rentComplete) {
      window.scrollTo(0, 0);
    }
  }, [rentComplete]);

  // counter to back /home after and all rent operations
  const navigate = useNavigate();

  useEffect(() => {
    if (rentComplete === true) {
      setTimeout(() => {
        setCounter(counter - 1);
      }, 1000);
    }
  }, [rentComplete, counter]);

  useEffect(() => {
    if (counter < 1) {
      navigate('/home');
      setRentComplete(false);
    }
  }, [counter, rentComplete]);

  return (
    <Col className={`${rentComplete ? 'complete-side' : 'complete-side-hide'}`}>
      <h1>Świetnie udało się! Miłego grania!</h1>
      <img
        // eslint-disable-next-line max-len
        src='https://media4.giphy.com/media/wbKYK0Mgnb3TBjNBOQ/giphy.gif?cid=ecf05e47ahfddm3prp2bvdg1i9nw1yafjy7wbira87tlhbeq&rid=giphy.gif&ct=s'
        className='giphy-embed'
      ></img>
      <p style={{ display: 'flex', flexWrap: 'wrap' }}>
        (Zostaniesz przekierowany na strone główną za{' '}
        <span className='counter'>{counter}</span> sek)
      </p>
    </Col>
  );
};
