import React, { useEffect, useState } from 'react';
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Row,
  Spinner,
  Table
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { IGames } from '../../types/types';
import RentForm from '../rentForm/RentForm';
import './rentCart.scss';

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
  const [rentConfirmation, setRentConfirmation] = useState(false);

  // copy rentForm state from RentForm component
  const [userForm, setUserForm] = useState({
    name: 'Patryk',
    surname: 'Stach',
    email: 'agentstach@wp.pl',
    adress: 'Popieluszki8/6a',
    date: '01-10-0200'
  });

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
      <Row className="flip-card">
        <Row
          className={`${
            !rentConfirmation ? 'flip-card-inner' : 'flip-card-inner-show'
          }`}
        >
          <Container className="confirmation-box">
            <Col className="confirmation-content">
                <h1>Czy wszystko się zgadza?</h1>
              <div className='selected-game'>
                <img src={game.image} alt={game.name}/>
                <h4>{game.name}</h4>
              </div>
              <Table size="sm">
                <tbody>
                  <tr>
                    <td>Imię</td>
                    <td>{userForm.name}</td>
                  </tr>
                  <tr>
                    <td>Nazwisko</td>
                    <td>{userForm.surname}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{userForm.email}</td>
                  </tr>
                  <tr>
                    <td>Adres</td>
                    <td>{userForm.adress}</td>
                  </tr>
                  <tr>
                    <td>Data zwrotu</td>
                    <td>{userForm.date}</td>
                  </tr>
                </tbody>
                <Badge bg="warning" text="dark">
                {totalPriceOperation}
              </Badge>
              </Table>
              <div className='btn-box-confirm'>
                <Button
                  onClick={() => setRentConfirmation(false)}
                  variant="danger"
                >
                  WRÓĆ
                </Button>
                <Button variant="success">POŻYCZAM</Button>
              </div>
            </Col>
          </Container>
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
                  setRentConfirmation={setRentConfirmation}
                  setUserForm={setUserForm}
                />
              </Col>
            </Row>
          </Container>
        </Row>
      </Row>
    </Container>
  );
};

export default rentCart;
