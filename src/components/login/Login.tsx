/* eslint-disable @typescript-eslint/no-shadow */
import './login.scss';
import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Nav
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { LinkContainer } from 'react-router-bootstrap';

interface IProps {
  mobileMode: boolean;
}

const Login = ({ mobileMode }: IProps) => {
  const [loginSubmit, setLoginSubmit] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  const [triger, setTriger] = useState(false);
  const [user, setUser] = useState(null);

  // set state user when auth changed
  onAuthStateChanged(auth, (currentUser: any) => {
    setUser(currentUser);
  });

  const handleValidation = () => {
    const errors: any = {};

    if (!loginForm.email) {
      errors.email = 'Wymagany email';
    } else if (!/\S+@\S+\.\S+/.test(loginForm.email)) {
      errors.email = 'Hmm… to nie wygląda jak adres e-mail.';
    } else if (loginError === 'auth/internal-error') {
      errors.email = 'Niepoprawny email lub hasło';
    } else if (loginError === 'auth/user-not-found') {
      errors.email = 'Nie znaleziono takiego użytkownika';
    }

    if (!loginForm.password) {
      errors.password = 'Wymagane hasło';
    } else if (loginForm.password.length < 6) {
      errors.password = 'Hasło jest zbyt krótkie';
    } else if (loginError === 'auth/wrong-password') {
      errors.password = 'Nieprawidłowe hasło ';
    } else if (loginError === 'auth/too-many-requests') {
      errors.password = 'Podjąłes zbyt dużo prób spróbuj ponownie później';
    }

    return errors;
  };

  const hadnleSubmit = (e: any) => {
    e.preventDefault();
    setLoginError('');
    setLoginSubmit(true);
    setErrors(handleValidation());
    setTriger(!triger);
  };

  const login = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(
        auth,
        loginForm.email,
        loginForm.password
      );
    } catch (error: any) {
      setLoginError(error.code);
    }
    setLoading(false);
    setLoginSubmit(false);
    setLoginError('');
  };

  // safeguard against the clicker post infinte
  useEffect(() => {
    if (loginError !== '') {
      setErrors(handleValidation());
      loginForm.email = '';
      loginForm.password = '';
    }
  }, [loginError]);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && loginSubmit === true) {
      login();
      setErrors(handleValidation());
    }
  }, [triger]);

  const handleRegisterForm = (e: {
    target: { name: string; value: string };
  }) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  // when login navigate to dashboard
  const navigate = useNavigate();
  useEffect(() => {
    if (user !== null) {
      setLoginSubmit(true);
      navigate('/dashboard');
    }
    return () => {
      setLoginSubmit(false);
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
      <Col className="neon-yellow"></Col>
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
          {loading
            ? (
            <Spinner animation="grow" variant="light" />
              )
            : (
            <Form onSubmit={hadnleSubmit}>
              {errors.email || errors.password
                ? (
                <Form.Label className="error-rent">
                  <i className="bi bi-exclamation-triangle"></i>
                  {errors.email ? errors.email : errors.password}
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
                  value={loginForm.email}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Hasło:</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Hasło"
                  onChange={handleRegisterForm}
                  value={loginForm.password}
                />
              </Form.Group>
              <Button type="submit" variant="primary">
                Login
              </Button>
            </Form>
              )}
              {loading
                ? null :
          <LinkContainer to="/register">
            <Nav.Link>Nie masz jeszcze konta?</Nav.Link>
          </LinkContainer>
          }
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
