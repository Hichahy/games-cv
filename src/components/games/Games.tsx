import './games.scss'
import React, { useEffect } from 'react'
import { Container, Row, Card, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { IGames } from '../../types/types'

interface IProps {
  games: IGames[];

  loadGames: () => void;
}

const Games = ({ games, loadGames }: IProps) => {
  useEffect(() => {
    loadGames()
  }, [loadGames])

  if (games.length < 1) {
    return (
      <div className="loading-box">
        <Spinner
          animation="border"
          style={{ color: 'white', height: '7rem', width: '7rem' }}
          role="status"
        />
        <span style={{ color: 'white' }}>Loading</span>
      </div>
    )
  }

  return (
    <Container fluid className="container-game">
      <Row className="game-box">
        {games.map((game) => (
          <Card key={game.id} className="cart-game">
            <Link to={`/game/${game.id}`}>
              <Card.Img className="img-game" variant="top" src={game.image} />
            </Link>
            <Card.Body>
              <Card.Title>{game.name}</Card.Title>
              <Card.Text>{game.description}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container>
  )
}

export default Games
