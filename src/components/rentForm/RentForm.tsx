/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-shadow */
import './rentForm.scss';
import React, { useEffect, useState } from 'react';
import { Row, Col, Form, FormControl, Button, Badge } from 'react-bootstrap';

interface IProps {
  setTotalAnimation: React.Dispatch<React.SetStateAction<boolean>>;
  setTotalPrice: React.Dispatch<React.SetStateAction<{
    d2: string;
    rentDays: number;
}>>
  setRentConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
  setUserForm: React.Dispatch<React.SetStateAction<{
    name: string;
    surname: string;
    email: string;
    adress: string;
    date: string;
    idGame: string;
    gameName: string;
}>>;
  totalPriceOperation: JSX.Element;
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
  totalPriceOperation,
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
    gameName: gameName
  });

  const [errors, setErrors] = useState<any>({});

  const [rentSubmit, setRentSubmit] = useState(false);

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
      errors.name = 'Nieprawidłowe imię';
    }

    if (!rentForm.surname.trim()) {
      errors.surname = 'Wymagane nazwisko';
    } else if (!/^[A-Za-z]+/.test(rentForm.surname.trim())) {
      errors.surname = 'Nieprawidłowe Nazwisko';
    }

    if (!rentForm.email) {
      errors.email = 'Wymagany email';
    } else if (!/\S+@\S+\.\S+/.test(rentForm.email)) {
      errors.email = 'Nieprawidłowy email';
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

  const handleSubmit = (e: { preventDefault: () => void}) => {
    e.preventDefault();
    setErrors(handleValidation());
    setUserForm(rentForm);
    setRentSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && rentSubmit) {
      setRentConfirmation(true);
      setRentSubmit(false)
    };
  }, [errors, rentSubmit]);

  useEffect(() => {
    if (mobileMode && rentSubmit) {
      window.scrollTo(0, 0);
    }
  }, [rentSubmit])

  return (
    <Form onSubmit={handleSubmit} className="rent-form">
      <h1>Wypełnij formularz</h1>
      <Row className='form-box'>
        <Col className="input-container">
          <Col className="input-box">
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

          <Col className="input-box">
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

          <Col className="input-box">
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

          <Col className="input-box">
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

          <Col className="input-box">
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

          <Col className="input-box">
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
        </Col>
      </Row>
      <Badge
        bg="warning"
        text="dark"
        className={`total ${totalAnimation ? 'total-boom' : ''}`}
      >
        {totalPriceOperation}
      </Badge>
      <Button className="form-rent-btn" type="submit" variant="success">
        DALEJ
      </Button>
    </Form>
  );
};

export default rentForm;
