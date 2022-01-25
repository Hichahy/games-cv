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
import { useParams, useNavigate } from 'react-router-dom';
import { IGames, IOrders } from '../../types/types';
import RentForm from '../rentForm/RentForm';
import './rentCart.scss';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase-config';

interface IProps {
  games: IGames[];
  loadGames: () => void;
  sendData: ({
    name,
    surname,
    date,
    adress,
    email,
    idGame,
    gameName,
    price
  }: IOrders) => void;
  mobileMode: boolean;
}

const rentCart = ({ games, loadGames, sendData, mobileMode }: IProps) => {
  // Pharams game
  const { id } = useParams();
  const find = () => {
    return games.find((x) => x.id === id);
  };
  const game = find()!;
  // Pharams game //

  const [totalPrice, setTotalPrice] = useState({
    d2: '',
    rentDays: 0
  });

  const [totalAnimation, setTotalAnimation] = useState(false);
  const [rentConfirmation, setRentConfirmation] = useState(false);
  const [rentComplete, setRentComplete] = useState(false);
  const [counter, setCounter] = useState(10);

  // copy rentForm state from RentForm low component
  const [userForm, setUserForm] = useState({
    name: '',
    surname: '',
    email: '',
    adress: '',
    date: '',
    idGame: '',
    gameName: '',
    price: ''
  });
  const [user, setUser] = useState<any>({});

  onAuthStateChanged(auth, (currentUser: any) => {
    setUser(currentUser);
  });

  useEffect(() => {
    loadGames();
  }, [loadGames]);

  // counter to back /home after and all rent operations
  const navigate = useNavigate();
  useEffect(() => {
    if (rentComplete === true) {
      setTimeout(() => {
        setCounter(counter - 1);
      }, 1000);
    }
  }, [rentComplete, counter]);

  useEffect(() => {
    if (counter < 1) {
      navigate('/home');
      setRentComplete(false);
    }
  }, [counter, rentComplete]);

  // scroll up when end but only in mobile mode
  useEffect(() => {
    if (mobileMode && rentComplete) {
      window.scrollTo(0, 0);
    }
  }, [rentComplete]);

  // -25 % for useres
  const totalCash = user
    ? ((25 / 100) * game.price * totalPrice.rentDays).toFixed(2)
    : (game.price * totalPrice.rentDays).toFixed(2);

  const sendOrderHandle = () => {
    sendData(userForm);
    setRentComplete(true);
  };

  // loading
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

  return (
    <Container className="rent-container">
      <Col className={`${!rentComplete ? 'neon' : 'neon-green'}`}></Col>
      <Row className="rent-cart">
        <Col
          className={`${!rentConfirmation ? 'front-side' : 'front-side-hide'}`}
        >
          <Col className="box-rent-cart">
            <Col className="tittle-content">
              <Image src={game.image} alt={`${game.name} cover`}></Image>
              <h4>{game.name}</h4>
              <Badge bg="warning" text="dark">
                {user
                  ? ((25 / 100) * game.price).toFixed(2)
                  : game.price.toFixed(2)}
                ¥/dzień
              </Badge>
              <Badge
                bg="warning"
                text="dark"
                className={`total ${totalAnimation ? 'total-boom' : ''}`}
              >
                total:{totalCash}¥
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
              totalCash={totalCash}
              totalAnimation={totalAnimation}
              idGame={game.id}
              gameName={game.name}
              mobileMode={mobileMode}
            />
          </Col>
        </Col>
        <Col
          className={`${
            rentConfirmation && !rentComplete ? 'back-side' : 'back-side-hide'
          }`}
        >
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
            total:{totalCash}¥
          </Badge>
          <div className="confirmation-btn-box">
            <Button onClick={() => setRentConfirmation(false)} variant="danger">
              WRÓĆ
            </Button>
            <Button onClick={sendOrderHandle} variant="success">
              POŻYCZAM
            </Button>
          </div>
        </Col>
        <Col
          className={`${rentComplete ? 'complete-side' : 'complete-side-hide'}`}
        >
          <h1>Świetnie udało się! Miłego grania!</h1>
          <img
            src="https://media4.giphy.com/media/wbKYK0Mgnb3TBjNBOQ/giphy.gif?cid=ecf05e47ahfddm3prp2bvdg1i9nw1yafjy7wbira87tlhbeq&rid=giphy.gif&ct=s"
            className="giphy-embed"
          ></img>
          <p style={{ display: 'flex', flexWrap: 'wrap' }}>
            (Zostaniesz przekierowany na strone główną za{' '}
            <span className="counter">{counter}</span> sek)
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default rentCart;
