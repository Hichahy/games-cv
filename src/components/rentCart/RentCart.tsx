import React, { useEffect, useState } from 'react';
import {
  Badge,
  Button,
  Col,
  Container,
  Row,
  Spinner,
  Image,
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

  console.log('set', rentConfirmation);
  // copy rentForm state from RentForm component
  const [userForm, setUserForm] = useState({
    name: '',
    surname: '',
    email: '',
    adress: '',
    date: ''
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
      <Col className='neon'></Col>
      <Row className="rent-cart">
        <Col
          className={`${!rentConfirmation ? 'front-side' : 'front-side-hide'}`}
        >
          <Col className="box-rent-cart">
            <Col className="tittle-content">
              <Image src={game.image} alt={`${game.name} cover`}></Image>
              <h4>{game.name}</h4>
              <Badge bg="warning" text="dark">
                {game.price.toFixed(2)}¥/dzień
              </Badge>
              <Badge
                bg="warning"
                text="dark"
                className={`total ${totalAnimation ? 'total-boom' : ''}`}
              >
                {totalPriceOperation}
              </Badge>
              <div className="icon-box">
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
            </Col>
            <RentForm
              setTotalAnimation={setTotalAnimation}
              setTotalPrice={setTotalPrice}
              setRentConfirmation={setRentConfirmation}
              setUserForm={setUserForm}
              totalPriceOperation={totalPriceOperation}
              totalAnimation={totalAnimation}
            />
          </Col>
        </Col>
        <Col className={`${rentConfirmation ? 'back-side' : 'back-side-hide'}`}>
          <h1>Czy wszystko się zgadza?</h1>
          <div className="confirmation-img-box">
            <Image src={game.image} alt={`${game.name} cover`}></Image>
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
          </Table>
          <Badge bg="warning" text="dark">
            {totalPriceOperation}
          </Badge>
          <div className="confirmation-btn-box">
            <Button onClick={() => setRentConfirmation(false)} variant="danger">
              WRÓĆ
            </Button>
            <Button variant="success">POŻYCZAM</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default rentCart;
