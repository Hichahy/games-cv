import './register.scss';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Nav
} from 'react-bootstrap';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { LinkContainer } from 'react-router-bootstrap';
import { handleValidationRegister } from '../validation'

interface IProps {
  user: null;
}

const Register = ({ user }: IProps) => {
  const [registerSubmit, setRegisterSubmit] = useState(false);
  const [errors, setErrors] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [loading, setLoading] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [confirmation, setConfirmation] = useState(false);
  const [triger, setTriger] = useState(false);

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRegisterError('');
    setRegisterSubmit(true);
    handleValidationRegister(setErrors, registerForm, registerError, confirmation);
    setTriger((prev) => !prev);
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
      handleValidationRegister(setErrors, registerForm, registerError, confirmation);
      registerForm.email = '';
      registerForm.password = '';
      registerForm.confirmPassword = '';
      setConfirmation(false);
    }
  }, [registerError]);

  useEffect(() => {
    if (errors === '' && registerSubmit === true) {
      register();
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

  return (
    <Container className='register-container'>
      <Col className='neon'></Col>
      <Row className='account-box'>
        <Col className='advertisement-box-register'>
          <Col>
            <h1>Witaj w Rejestracji</h1>
            <p>Dołącz do nas i zyskaj 25% zniżki na każdą pożyczoną grę 💰</p>
            <span onClick={executeScroll}>
              Zjedź w dół <i className='bi bi-chevron-double-down'></i>
            </span>
          </Col>
        </Col>
        <Col ref={myRef} className='input-box-register'>
          {loading
            ? (
            <Spinner animation='grow' variant='light' />
              )
            : (
            <Form onSubmit={handleSubmit}>
              {errors !== ''
                ? (
                <Form.Label data-testid='error-register-test' className='error-rent'>
                  <i className='bi bi-exclamation-triangle'></i>
                  <span data-testid='error-register-span'>{errors}</span>
                </Form.Label>
                  )
                : null}
              <Form.Group>
                <Form.Label>email:</Form.Label>
                <Form.Control
                  data-testid='input-register-test'
                  type='email'
                  name='email'
                  placeholder='Email'
                  onChange={handleRegisterForm}
                  value={registerForm.email}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Hasło:</Form.Label>
                <Form.Control
                  data-testid='input-register-test-password'
                  type='password'
                  name='password'
                  placeholder='Hasło'
                  onChange={handleRegisterForm}
                  value={registerForm.password}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Powtórz hasło:</Form.Label>
                <Form.Control
                  data-testid='input-register-test-password-confirm'
                  type='password'
                  name='confirmPassword'
                  placeholder='Powtórz hasło'
                  onChange={handleRegisterForm}
                  value={registerForm.confirmPassword}
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Check
                  data-testid='input-register-test-checkbox'
                  type='checkbox'
                  label='Zgadzam się na wszystko'
                  onClick={() => setConfirmation(!confirmation)}
                />
              </Form.Group>
              <Button type='submit' variant='primary'>
                Rejestracja
              </Button>
            </Form>
              )}
          {loading
            ? null
            : (
            <LinkContainer to='/login'>
              <Nav.Link data-testid='input-register-redirect'>Masz już konto?</Nav.Link>
            </LinkContainer>
              )}
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
