/* eslint-disable @typescript-eslint/no-shadow */
import './register.scss';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../../firebase-config';

interface IProps {
  mobileMode: boolean;
}

const Register = ({ mobileMode }: IProps) => {
  const [registerSubmit, setRegisterSubmit] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [registerError, setRegisterError] = useState('');
  const [loading, setLoading] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [confirmation, setConfirmation] = useState(false);
  const [triger, setTriger] = useState(false);
  const [user, setUser] = useState(null);

  // set state user when auth changed
  onAuthStateChanged(auth, (currentUser: any) => {
    setUser(currentUser);
  });

  const handleValidation = () => {
    const errors: any = {};

    if (!registerForm.email) {
      errors.email = 'Wymagany email';
    } else if (!/\S+@\S+\.\S+/.test(registerForm.email)) {
      errors.email = 'Hmm… to nie wygląda jak adres e-mail';
    } else if (registerError === 'auth/email-already-in-use') {
      errors.email = 'Ten email jest już zajęty';
    }

    if (!registerForm.password) {
      errors.password = 'Wymagane hasło';
    } else if (registerForm.password.length < 6) {
      errors.password = 'Hasło jest zbyt krótkie';
    }

    if (!registerForm.confirmPassword) {
      errors.confirmPassword = 'Wymagane powtórzenie hasła';
    } else if (registerForm.confirmPassword.length < 6) {
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
    setRegisterError('');
    setRegisterSubmit(true);
    setErrors(handleValidation());
    setTriger(!triger);
  };

  const handleRegisterForm = (e: {
    target: { name: string; value: string };
  }) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const register = async () => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(
        auth,
        registerForm.email,
        registerForm.password
      );
    } catch (error: any) {
      setRegisterError(error.code);
    }
    setLoading(false);
    setRegisterSubmit(false);
    setRegisterError('');
  };
  // safeguard against the clicker post infinte
  useEffect(() => {
    if (registerError !== '') {
      setErrors(handleValidation());
      registerForm.email = '';
      registerForm.password = '';
      registerForm.confirmPassword = '';
      setConfirmation(false);
    }
  }, [registerError]);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && registerSubmit === true) {
      register();
      setErrors(handleValidation());
    }
  }, [triger]);

  // when login navigate to dashboard
  const navigate = useNavigate();
  useEffect(() => {
    if (user !== null) {
      setRegisterSubmit(true);
      navigate('/dashboard');
    }
    return () => {
      setRegisterSubmit(false);
    };
  }, [user]);

  // onClick go to form
  const myRef: any = useRef(null);
  const executeScroll = () => {
    myRef.current.scrollIntoView();
  };

  // if error scroll to him
  useEffect(() => {
    if (mobileMode && Object.keys(errors).length > 0) {
      myRef.current.scrollIntoView();
    }
  }, [triger]);

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
          {loading
            ? (
            <Spinner animation="grow" variant="light" />
              )
            : (
            <Form onSubmit={handleSubmit}>
              {errors.email ||
              errors.password ||
              errors.confirmPassword ||
              errors.check
                ? (
                <Form.Label className="error-rent">
                  <i className="bi bi-exclamation-triangle"></i>
                  {errors.email
                    ? errors.email
                    : errors.password
                      ? errors.password
                      : errors.confirmPassword
                        ? errors.confirmPassword
                        : errors.check}
                </Form.Label>
                  )
                : null}
              <Form.Group>
                <Form.Label>email:</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleRegisterForm}
                  value={registerForm.email}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Hasło:</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Hasło"
                  onChange={handleRegisterForm}
                  value={registerForm.password}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Powtórz hasło:</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  placeholder="Powtórz hasło"
                  onChange={handleRegisterForm}
                  value={registerForm.confirmPassword}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Zgadzam się na wszystko"
                  onClick={() => setConfirmation(!confirmation)}
                />
              </Form.Group>
              <Button type="submit" variant="primary">
                Rejestracja
              </Button>
            </Form>
              )}
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
