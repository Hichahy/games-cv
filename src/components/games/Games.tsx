import React from 'react';
import Filters from '../filters';
import { Container, Row, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IGames } from '../../types/types';
import { SpinnerLoading } from '../layout/spinnerLoading';
import './games.scss';

interface IProps {
  games: IGames[];
  phrase: string;
  filteredItems: IGames[];
  loadingFetch: boolean;
}

const Games = ({ filteredItems, phrase, loadingFetch }: IProps) => {
  if (loadingFetch) {
    return <SpinnerLoading />;
  }

  return (
    <Container fluid className='game-container'>
      <Filters />
      {filteredItems.length < 1
        ? (
        <div className='not-found-div'>
          <p>Nie znalazłem gry {phrase} </p>
        </div>
          )
        : (
        <Row className='game-box'>
          {filteredItems.map((i) => (
            <Card key={i.id} className='cart-game'>
              <Link to={`/game/${i.id}`}>
                <Card.Img variant='top' src={i.image} />
              </Link>
              <Card.Body>
                <Card.Title>{i.name}</Card.Title>
                <Card.Text>{i.description}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Row>
          )}
    </Container>
  );
};

export default Games;
