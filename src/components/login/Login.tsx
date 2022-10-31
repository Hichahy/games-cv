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
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { LinkContainer } from 'react-router-bootstrap';
import { handleValidationLogin } from '../validation';

interface IProps {
  user: null;
}

const Login = ({ user }: IProps) => {
  const [loginSubmit, setLoginSubmit] = useState(false);
  const [errors, setErrors] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  const [triger, setTriger] = useState(false);

  const hadnleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginError('');
    setLoginSubmit(true);
    handleValidationLogin(setErrors, loginForm, loginError);
    setTriger((prev) => !prev);
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
      handleValidationLogin(setErrors, loginForm, loginError);
      loginForm.email = '';
      loginForm.password = '';
    }
  }, [loginError]);

  useEffect(() => {
    if (errors === '' && loginSubmit === true) {
      login();
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
  const myRef = useRef<HTMLDivElement>(null);
  const executeScroll = () => {
    myRef.current?.scrollIntoView();
  };

  return (
    <Container className='login-container'>
      <Col className='neon-yellow'></Col>
      <Row className='account-box'>
        <Col className='advertisement-box-login'>
          <Col>
            <h1>Witaj w logowaniu</h1>
            <p>Świtnie Cię widzieć! Gotowy na kolejne wyzwania? 🎮</p>
            <span onClick={executeScroll}>
              Zjedź w dół <i className='bi bi-chevron-double-down'></i>
            </span>
          </Col>
        </Col>
        <Col ref={myRef} className='form-box-login'>
          {loading
            ? (
            <Spinner animation='grow' variant='light' />
              )
            : (
            <Form onSubmit={hadnleSubmit}>
                 {errors !== ''
                   ? (
                <Form.Label className='error-rent' data-testid='error-login-test'>
                  <i className='bi bi-exclamation-triangle'></i>
                  <span data-testid='error-span' >{errors}</span>
                </Form.Label>
                     )
                   : null}
              <Form.Group>
                <Form.Label>email:</Form.Label>
                <Form.Control
                  data-testid='input-login-test'
                  type='email'
                  name='email'
                  placeholder='Email'
                  onChange={handleRegisterForm}
                  value={loginForm.email}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Hasło:</Form.Label>
                <Form.Control
                  data-testid='input-login-test-password'
                  type='password'
                  name='password'
                  placeholder='Hasło'
                  onChange={handleRegisterForm}
                  value={loginForm.password}
                />
              </Form.Group>
              <Button type='submit' variant='primary'>
                Login
              </Button>
            </Form>
              )}
          {loading
            ? null
            : (
            <LinkContainer to='/register'>
              <Nav.Link data-testid='input-login-redirect'>Nie masz jeszcze konta?</Nav.Link>
            </LinkContainer>
              )}
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
