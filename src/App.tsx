/* eslint-disable @typescript-eslint/no-shadow */
import './App.scss'
import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import { Route, Routes } from 'react-router-dom'
import { connect } from 'react-redux'
import Home from './components/home'
import Navigation from './components/navigation'
import Games from './components/games'
import GameCart from './components/gameCart'
import { IStore } from './types/IStore'
import { toggleMobileMode } from './actions/Rental'
import Footer from './components/footer/Footer'

interface IProps {
  toggleMobileMode: (mobileMode: boolean) => void;
}

const App = ({ toggleMobileMode }: IProps) => {
  const [width, setWidth] = useState(window.innerWidth)

  // mobile mode
  window.addEventListener('resize', () => setWidth(window.innerWidth))
  useEffect(() => {
    if (width < 765) {
      toggleMobileMode(true)
    } else {
      toggleMobileMode(false)
    }
  }, [toggleMobileMode, width])

  return (
    <Container fluid>
      <Row>
        <Navigation />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/game/:id" element={<GameCart />} />
        </Routes>
      </Row>
      <Footer />
    </Container>
  )
}

export default connect(
  (state: IStore) => ({
  }),
  { toggleMobileMode }
)(App)
