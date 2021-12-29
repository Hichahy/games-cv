import './App.scss'
import { Container, Row } from 'react-bootstrap'
import { Route, Routes } from 'react-router-dom'
import Home from './components/home'
import Navigation from './components/navigation'
import React from 'react'
import Games from './components/games'

const App = () => {
  return (
    <Container fluid>
      <Row>
        <Navigation />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/games" element={<Games />} />
        </Routes>
      </Row>
    </Container>
  )
}

export default App
