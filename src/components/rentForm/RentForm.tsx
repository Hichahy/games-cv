/* eslint-disable @typescript-eslint/no-shadow */
import './rentForm.scss';
import React, { useEffect, useState } from 'react';
import { Row, Col, Form, FormControl, Button } from 'react-bootstrap';

interface IProps {
  setTotalAnimation: any;
  setTotalPrice?: any;
}

const rentForm = ({ setTotalAnimation, setTotalPrice }: IProps) => {
  const [rentForm, setRentForm] = useState({
    name: '',
    surname: '',
    email: '',
    adress: '',
    date: '',
    age: 0
  });

  const [errors, setErrors] = useState<any>({});

  const handleRentForm = (e: { target: { name: string; value: string } }) => {
    setRentForm({ ...rentForm, [e.target.name]: e.target.value });
  };

  // Date

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

  // Date End //

  const handleValidation = () => {
    const errors: any = {};

    if (!rentForm.name.trim()) {
      errors.name = 'Wymagane Imię';
    } else if (!/^[A-Za-z]+/.test(rentForm.name.trim())) {
      errors.name = 'Nieprawiłwe imię';
    }

    if (!rentForm.surname.trim()) {
      errors.surname = 'Wymagane nazwisko';
    } else if (!/^[A-Za-z]+/.test(rentForm.surname.trim())) {
      errors.surname = 'Nieprawiłwe Nazwisko';
    }

    if (!rentForm.email) {
      errors.email = 'Wymagany email';
    } else if (!/\S+@\S+\.\S+/.test(rentForm.email)) {
      errors.email = 'Niepoprawny email';
    }

    if (!rentForm.adress) {
      errors.adress = 'Wymagany adress';
    } else if (rentForm.adress.length < 3) {
      errors.adress = 'Adres jest zbyt krótki';
    }

    if (!rentForm.date) {
      errors.date = 'Wymagana data oddania';
    }

    if (!rentForm.age) {
      errors.age = 'Wymagany wiek';
    } else if (rentForm.age < 16) {
      errors.age = 'Jesteś zbyt młody';
    } else if (rentForm.age > 80) {
      errors.age = 'Jesteś zbyt stary na gry';
    }

    return errors;
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setErrors(handleValidation());
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <Form.Label>Imię</Form.Label>
          <FormControl
            type="text"
            placeholder="Imię"
            name="name"
            onChange={handleRentForm}
          />
          {errors.name && (
            <Form.Label className="error-rent">
              <i className="bi bi-exclamation-triangle"></i>
              {errors.name}
            </Form.Label>
          )}
        </Col>
        <Col>
          <Form.Label>Nazwisko</Form.Label>
          <FormControl
            type="text"
            placeholder="Nazwisko"
            name="surname"
            onChange={handleRentForm}
          />
          {errors.surname && (
            <Form.Label className="error-rent">
              <i className="bi bi-exclamation-triangle"></i>
              {errors.surname}
            </Form.Label>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Label>Email</Form.Label>
          <FormControl
            type="text"
            placeholder="Email"
            name="email"
            onChange={handleRentForm}
          />
          {errors.email && (
            <Form.Label className="error-rent">
              <i className="bi bi-exclamation-triangle"></i>
              {errors.email}
            </Form.Label>
          )}
        </Col>
        <Col>
          <Form.Label>Adres</Form.Label>
          <FormControl
            type="text"
            placeholder="Adres"
            name="adress"
            onChange={handleRentForm}
          />
          {errors.adress && (
            <Form.Label className="error-rent">
              <i className="bi bi-exclamation-triangle"></i>
              {errors.adress}
            </Form.Label>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Label>Pożyczam do</Form.Label>
          <FormControl
            type="date"
            min={`${yyyy}-${mm}-${dd}`}
            name="date"
            onChange={handleRentForm}
          />
          {errors.date && (
            <Form.Label className="error-rent">
              <i className="bi bi-exclamation-triangle"></i>
              {errors.date}
            </Form.Label>
          )}
        </Col>
        <Col>
          <Form.Label>Twój wiek</Form.Label>
          <FormControl
            type="number"
            min="1"
            name="age"
            onChange={handleRentForm}
          />
          {errors.age && (
            <Form.Label className="error-rent">
              <i className="bi bi-exclamation-triangle"></i>
              {errors.age}
            </Form.Label>
          )}
        </Col>
      </Row>
      <Button type="submit" variant="success">
        Success
      </Button>
    </Form>
  );
};

export default rentForm;
