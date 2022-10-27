/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-shadow */
import './rentForm.scss';
import React, { useEffect, useState } from 'react';
import { Row, Col, Form, FormControl, Button, Badge } from 'react-bootstrap';
import { IOrders } from '../../types/types';
import { handleValidationRent } from '../validation'

interface IProps {
  setTotalAnimation: React.Dispatch<React.SetStateAction<boolean>>;
  setTotalPrice: React.Dispatch<
    React.SetStateAction<{
      d2: string;
      rentDays: number;
    }>
  >;
  setRentConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
  setUserForm: React.Dispatch<React.SetStateAction<IOrders>>;
  amountPrice: string;
  totalAnimation: boolean;
  idGame: string;
  gameName: string;
  mobileMode: boolean;
}

const rentForm = ({
  setTotalAnimation,
  setTotalPrice,
  setRentConfirmation,
  setUserForm,
  amountPrice,
  totalAnimation,
  idGame,
  gameName,
  mobileMode
}: IProps) => {
  const [rentForm, setRentForm] = useState({
    name: '',
    surname: '',
    email: '',
    adress: '',
    date: '',
    age: 0,
    idGame: idGame,
    gameName: gameName,
    price: amountPrice
  });
  const [errors, setErrors] = useState('');
  const [rentSubmit, setRentSubmit] = useState(false);

  const handleRentForm = (e: { target: { name: string; value: string } }) => {
    setRentForm({ ...rentForm, [e.target.name]: e.target.value });
  };

  // Date operations to set day and calculate price
  const today: any = new Date();
  let dd: number | string = today.getDate() + 1;
  let mm: number | string = today.getMonth() + 1;
  const yyyy: number | string = today.getFullYear();

  if (dd < 10) {
    dd = '0' + dd;
  }

  if (mm < 10) {
    mm = '0' + mm;
  }

  const d1 = new Date(today).toLocaleDateString('en-US');
  const d2 = new Date(rentForm.date).toLocaleDateString('en-US');

  function parseDate (str: any) {
    const mdy = str.split('/');
    return new Date(mdy[2], mdy[0] - 1, mdy[1]);
  }

  function datediff (d1: any, d2: any) {
    return Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
  }

  const rentDays = datediff(parseDate(d1), parseDate(d2));

  useEffect(() => {
    if (d2 !== 'Invalid Date') {
      setTotalPrice({ d2, rentDays });
      setTotalAnimation(true);
    }
    const timer = setTimeout(() => {
      setTotalAnimation(false);
    }, 300);
    return () => {
      setTotalPrice({
        d2: '',
        rentDays: 0
      });
      clearTimeout(timer);
    };
  }, [d2, rentDays, setTotalPrice, setTotalAnimation]);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    handleValidationRent(rentForm, setErrors);
    setUserForm(rentForm);
    setRentSubmit(true);
    rentForm.price = amountPrice;
  };

  useEffect(() => {
    if (errors === '' && rentSubmit) {
      setRentConfirmation(true);
      setRentSubmit(false);
    }
  }, [errors, rentSubmit]);

  useEffect(() => {
    if (mobileMode && rentSubmit) {
      window.scrollTo(0, 0);
    }
  }, [rentSubmit]);

  return (
    <Form onSubmit={handleSubmit} className='rent-form'>
      <h1>Wypełnij formularz</h1>
      {errors !== '' ?
        <Form.Label className='error-rent'>
          <i className='bi bi-exclamation-triangle'></i>
          <span>{errors}</span>
        </Form.Label>
        : null }
      <Row className='form-box'>
        <Col className='input-container'>
          <Col className='input-box'>
            <Form.Label>Imię</Form.Label>
            <FormControl
              type='text'
              placeholder='Imię'
              name='name'
              onChange={handleRentForm}
            />
          </Col>

          <Col className='input-box'>
            <Form.Label>Nazwisko</Form.Label>
            <FormControl
              type='text'
              placeholder='Nazwisko'
              name='surname'
              onChange={handleRentForm}
            />
          </Col>

          <Col className='input-box'>
            <Form.Label>Email</Form.Label>
            <FormControl
              type='text'
              placeholder='Email'
              name='email'
              onChange={handleRentForm}
            />
          </Col>

          <Col className='input-box'>
            <Form.Label>Adres</Form.Label>
            <FormControl
              type='text'
              placeholder='Adres'
              name='adress'
              onChange={handleRentForm}
            />
          </Col>

          <Col className='input-box'>
            <Form.Label>Pożyczam do</Form.Label>
            <FormControl
              type='date'
              min={`${yyyy}-${mm}-${dd}`}
              name='date'
              onChange={handleRentForm}
            />
          </Col>

          <Col className='input-box'>
            <Form.Label>Twój wiek</Form.Label>
            <FormControl
              type='number'
              min='1'
              name='age'
              onChange={handleRentForm}
            />
          </Col>
        </Col>
      </Row>
      <Badge
        bg='warning'
        text='dark'
        className={`total ${totalAnimation ? 'total-boom' : ''}`}
      >
        total:{amountPrice}¥
      </Badge>
      <Button className='form-rent-btn' type='submit' variant='success'>
        DALEJ
      </Button>
    </Form>
  );
};

export default rentForm;
