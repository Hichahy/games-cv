/* eslint-disable @typescript-eslint/no-shadow */
import './login.scss';
import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Login = () => {
  const [passwordSubmit, setPasswordSubmit] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  console.log('errors', errors);

  const handleValidation = () => {
    const errors: any = {};

    if (!loginForm.email) {
      errors.email = 'Wymagany email';
    } else if (!/\S+@\S+\.\S+/.test(loginForm.email)) {
      errors.email = 'Hmm… to nie wygląda jak adres e-mail.';
    }

    if (!loginForm.password) {
      errors.password = 'Wymagane hasło';
    } else if (loginForm.password.length < 4) {
      errors.password = 'Hasło jest zbyt krótkie';
    }

    return errors;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setErrors(handleValidation());
    setPasswordSubmit(true);
  };

  const handleRegisterForm = (e: {
    target: { name: string; value: string };
  }) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && passwordSubmit) {
      setPasswordSubmit(false);
    }
  }, [errors, passwordSubmit]);

  const myRef: any = useRef(null)

  const executeScroll = () => {
    myRef.current.scrollIntoView()
  }
  return (
    <Container className="account-container">
      <Col className="neon-green"></Col>
      <Row className="account-box">
        <Col className="advertisement-box-login">
          <Col style={{ padding: '10%', width: '100%' }}>
            <h1>Witaj w logowaniu</h1>
            <p>Świtnie Cię widzieć! Gotowy na kolejne wyzwania? 🎮</p>
            <p onClick={executeScroll} className="mobile-info">
              Zjedź w dół <i className="bi bi-chevron-double-down"></i>
            </p>
          </Col>
        </Col>
        <Col ref={myRef} className="input-box-login">
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleRegisterForm}
              />
              {errors.email && (
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
              {errors.password && !errors.email && (
                <Form.Label className="error-rent">
                  <i className="bi bi-exclamation-triangle"></i>
                  {errors.password}
                </Form.Label>
              )}
            </Form.Group>
            <Button type="submit" variant="primary">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
