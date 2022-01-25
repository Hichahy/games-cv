import './navigation.scss'
import { Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import React, { useState } from 'react'
import { auth } from '../../firebase-config'
import { onAuthStateChanged } from 'firebase/auth';

const Navigation = () => {
  const [user, setUser] = useState<any>({})

  onAuthStateChanged(auth, (currentUser: any) => {
    setUser(currentUser)
  })

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
          {!user
            ?
          <LinkContainer to="/register">
            <Nav.Link>Rejestracja</Nav.Link>
          </LinkContainer>
            :
            null }
          {!user
            ?
          <LinkContainer to="/login">
            <Nav.Link>Logowanie</Nav.Link>
          </LinkContainer>
            :
            null
          }
          {user
            ?
          <LinkContainer to="/dashboard">
            <Nav.Link>Panel</Nav.Link>
          </LinkContainer>
            :
            null
          }
          </Nav>
        </Navbar.Collapse>
    </Navbar>
    </>
  )
}

export default Navigation
