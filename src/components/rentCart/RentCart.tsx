import './rentCart.scss';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IGames } from '../../types/types';
import { Container, Row, Card, Badge, Spinner, Col } from 'react-bootstrap';
import RentForm from '../rentForm/RentForm';

interface IProps {
  games: IGames[];
  loadGames: () => void;
}

const rentCart = ({ games, loadGames }: IProps) => {
  const [totalPrice, setTotalPrice] = useState({
    d2: '',
    rentDays: 0
  });

  const [totalAnimation, setTotalAnimation] = useState(false);

  // Pharams game
  const { id } = useParams();

  const find = () => {
    return games.find((x) => x.id === id);
  };

  const game = find()!;
  // Pharams game //

  useEffect(() => {
    loadGames();
  }, [loadGames]);

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
    );
  }

  const totalPriceOperation = (
    <span>total: {(game.price * totalPrice.rentDays).toFixed(2)} ¥</span>
  );

  return (
    <Container className="rent-container">
      <Container className="form-box">
        <Row>
          <Card className="form-card">
            <img className="form-img" src={game.image}></img>
            <Card.Body>
              <Card.Title>{game.name}</Card.Title>
              <h5>
                <Badge bg="warning" text="dark">
                  {game.price.toFixed(2)}¥/dzień
                </Badge>
                <Badge
                  className={`total ${totalAnimation ? 'total-boom' : ''}`}
                  bg="warning"
                  text="dark"
                  style={{ marginLeft: '10px' }}
                >
                  {totalPriceOperation}
                </Badge>
              </h5>
              <div>
                {game.platform.includes('PlayStation 4')
                  ? (
                  <i className="bi bi-playstation"></i>
                    )
                  : null}
                {game.platform.includes('xbox')
                  ? (
                  <i className="bi bi-xbox"></i>
                    )
                  : null}
                {game.platform.includes('windows')
                  ? (
                  <i className="bi bi-windows"></i>
                    )
                  : null}
              </div>
            </Card.Body>
          </Card>
          <Col className="input-box">
            <h1>Uzupełnij formularz</h1>
            <RentForm
              setTotalAnimation={setTotalAnimation}
              setTotalPrice={setTotalPrice}
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default rentCart;
