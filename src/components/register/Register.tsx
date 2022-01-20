/* eslint-disable @typescript-eslint/no-shadow */
import './register.scss';
import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
// import { NavLink } from 'react-router-dom';

const Register = () => {
  const [registerSubmit, setRegisterSubmit] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [registerForm, setRegisterForm] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [confirmation, setConfirmation] = useState(false);

  console.log('errors', errors);

  const handleValidation = () => {
    const errors: any = {};

    if (!registerForm.userName) {
      errors.userName = 'Wymagane nazwa urzytkownika';
    } else if (!/^[A-Za-z]+/.test(registerForm.userName.trim())) {
      errors.userName = 'Hmm… to nie wygląda jak adres e-mail';
    } else if (registerForm.userName.length < 3) {
      errors.userName = 'Stać cie na więcej';
    }

    if (!registerForm.email) {
      errors.email = 'Wymagany email';
    } else if (!/\S+@\S+\.\S+/.test(registerForm.email)) {
      errors.email = 'Nieprawidłowy email';
    }

    if (!registerForm.password) {
      errors.password = 'Wymagane hasło';
    } else if (registerForm.password.length < 4) {
      errors.password = 'Hasło jest zbyt krótkie';
    }

    if (!registerForm.confirmPassword) {
      errors.confirmPassword = 'Wymagane powtórzenie hasła';
    } else if (registerForm.confirmPassword.length < 4) {
      errors.confirmPassword = 'Hasło jest zbyt krótkie';
    } else if (registerForm.confirmPassword !== registerForm.password) {
      errors.confirmPassword = 'Hasła do siebie nie pasują';
    }

    if (confirmation === false) {
      errors.check = 'Wymagana zgoda';
    }

    return errors;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setErrors(handleValidation());
    setRegisterSubmit(true);
  };

  const handleRegisterForm = (e: {
    target: { name: string; value: string };
  }) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && registerSubmit) {
      setRegisterSubmit(false);
    }
  }, [errors, registerSubmit]);

  const myRef: any = useRef(null)

  const executeScroll = () => {
    myRef.current.scrollIntoView()
  }

  return (
    <Container className="account-container">
      <Col className="neon"></Col>
      <Row className="account-box">
        <Col className="advertisement-box-register">
          <Col style={{ padding: '10%', width: '100%' }}>
            <h1>Witaj w Rejestracji</h1>
            <p>Dołącz do nas i zyskaj 25% zniżki na każdą pożyczoną grę 💰</p>
            <p onClick={executeScroll} className="mobile-info">
              Zjedź w dół <i className="bi bi-chevron-double-down"></i>
            </p>
          </Col>
        </Col>
        <Col ref={myRef} className="input-box-register">
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Nazwa urzytkownika:</Form.Label>
              <Form.Control
                name="userName"
                type="text"
                placeholder="Nazwa urzytkownika"
                onChange={handleRegisterForm}
              />
              {errors.userName && (
                <Form.Label className="error-rent">
                  <i className="bi bi-exclamation-triangle"></i>
                  {errors.userName}
                </Form.Label>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleRegisterForm}
              />
              {errors.email && !errors.userName && (
                <Form.Label className="error-rent">
                  <i className="bi bi-exclamation-triangle"></i>
                  {errors.email}
                </Form.Label>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Hasło:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Hasło"
                onChange={handleRegisterForm}
              />
              {errors.password && !errors.email && !errors.userName && (
                <Form.Label className="error-rent">
                  <i className="bi bi-exclamation-triangle"></i>
                  {errors.password}
                </Form.Label>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Powtórz hasło:</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Powtórz hasło"
                onChange={handleRegisterForm}
              />
              {errors.confirmPassword && !errors.email && !errors.password && !errors.userName && (
                <Form.Label className="error-rent">
                  <i className="bi bi-exclamation-triangle"></i>
                  {errors.confirmPassword}
                </Form.Label>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Zgadzam się na wszystko"
                onClick={() => setConfirmation(!confirmation)}
              />
              {errors.check && !errors.confirmPassword && !errors.email && !errors.password && !errors.userName && (
                <Form.Label className="error-rent">
                  <i className="bi bi-exclamation-triangle"></i>
                  {errors.check}
                </Form.Label>
              )}
            </Form.Group>
            <Button type="submit" variant="primary">Rejestracja</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
