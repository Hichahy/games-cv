import './games.scss'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Row, Card, Spinner } from 'react-bootstrap'

const Games = () => {
  const [games, setGames] = useState([])
  console.log(`games`, games)

  useEffect(() => {
    axios
      .get(
        'https://games-rental-83316-default-rtdb.europe-west1.firebasedatabase.app/games.json'
      )
      .then((res) => {
        console.log(res)
        setGames(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  if (games.length < 1) {
    return (
      <div className="loading-box">
       <Spinner animation="border" role="status"/>
        <span>Loading...</span>
      </div>
    )
  }

  return (
    <Container fluid className="container-game">
      <Row className="game-box">
      {games.map((game: {id: number, name: string, image: string, description: string}) => (
        <Card key={game.id} className="cart-game">
  <Card.Img className="img-game" variant="top" src={game.image} />
  <Card.Body>
    <Card.Title>{game.name}</Card.Title>
    <Card.Text>
     {game.description}
    </Card.Text>
  </Card.Body>
</Card>
      ))}
      </Row>
    </Container>
  )
}

export default Games
