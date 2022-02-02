import './dashboard.scss';
import React, { useState, useEffect } from 'react';
import { Container, Button, Spinner, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase-config';

interface IProps {
  getLogout: () => void;
}

const Dashboard = ({ getLogout }: IProps) => {
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser);
    });
  }, [])

  const logout = () => {
    getLogout()
  };

  const navigate = useNavigate();

  useEffect(() => {
    let cancel = false
    if (!user && !cancel) {
      navigate('/home');
    }
    return () => {
      cancel = true
    }
  }, [user])

  if (user === null) {
    return (
      <div className="loading-box">
        <Spinner
          animation="border"
          style={{ color: 'white', height: '7rem', width: '7rem' }}
          role="status"
        />
        <span style={{ color: 'white' }}>Loading</span>
      </div>
    );
  }

  return (
    <Container className="dashboard-container">
      <Col className="neon-gold" />
      <Row className="dasboard-cart">
        <Col>
          <i className="bi bi-person-circle"></i>
          <h2>{user.email}</h2>
          <p>Skoro tu jesteś otrzymujesz znizkę -25% na kazdą wybraną grę</p>
          <Button onClick={logout}>Wyloguj</Button>
        </Col>
      </Row>
    </Container>
  );
};
export default Dashboard;
