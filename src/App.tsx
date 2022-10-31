import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { IStore } from './types/IStore';
import { toggleMobileMode, loadGames } from './actions/Rental';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase-config';

import Home from './components/home';
import Navigation from './components/navigation';
import Games from './components/games';
import GameCart from './components/gameCart';
import Footer from './components/footer';
import RentCart from './components/rentCart';
import Register from './components/register';
import Login from './components/login';
import Dashboard from './components/dashboard';
import PrivateRouter from './components/PrivateRoute';

interface IProps {
  toggleMobileMode: (mobileMode: boolean) => void;
  loadGames: () => void;
}

const App = ({ toggleMobileMode, loadGames }: IProps) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadGames();
  }, []);

  onAuthStateChanged(auth, (currentUser: any) => {
    setUser(currentUser);
  });

  // when mobile mode
  window.addEventListener('resize', () => setWidth(window.innerWidth));
  useEffect(() => {
    if (width < 765) {
      toggleMobileMode(true);
    } else {
      toggleMobileMode(false);
    }
  }, [toggleMobileMode, width]);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Container fluid>
        <Row>
          <Navigation user={user} />
          <Routes>
            <Route path='/' element={<Navigate replace to='/home' />} />
            <Route path='/home' element={<Home />} />
            <Route path='/games' element={<Games />} />
            <Route path='/register' element={<Register user={user} />} />
            <Route path='/login' element={<Login user={user} />} />
            <Route path='/' element={<PrivateRouter />}>
              <Route path='/dashboard' element={<Dashboard />} />
            </Route>
            <Route path='/game/:id' element={<GameCart user={user} />} />
            <Route path='/rent/:id' element={<RentCart />} />
          </Routes>
        </Row>
        <Footer />
      </Container>
    </>
  );
};

export default connect((state: IStore) => ({}), { toggleMobileMode, loadGames })(App);
