import './navigation.scss'
import { Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import React from 'react'

const Navigation = () => {
  return (
    <>
      <Navbar className="main-nav" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand className='brand' href="/home">🦐Sajgonka </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
          <LinkContainer to="/home">
            <Nav.Link>Główna</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/games">
            <Nav.Link>Gry</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/register">
            <Nav.Link>Rejestracja</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/login">
            <Nav.Link>Logowanie</Nav.Link>
          </LinkContainer>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
    </>
  )
}

export default Navigation
