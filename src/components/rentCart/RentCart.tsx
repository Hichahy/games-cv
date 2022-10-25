import React, { useEffect, useState } from 'react';
import { Badge, Col, Container, Row, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { IGames, IOrders } from '../../types/types';
import RentForm from '../rentForm/RentForm';
import './rentCart.scss';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { IconsPlatform } from '../layout/iconsPlatform';
import { ConfirmationRent } from '../layout/confimationRent';
import { SuccesOrderCart } from '../layout/succesOrderCart';
import { SpinnerLoading } from '../layout/spinnerLoading';

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

  // -25 % for useres
  const totalCash = user
    ? ((75 / 100) * game.price * totalPrice.rentDays).toFixed(2)
    : (game.price * totalPrice.rentDays).toFixed(2);

  const sendOrderHandle = () => {
    sendData(userForm);
    setRentComplete(true);
  };

  // loading
  if (games.length < 1) {
    return (
     <SpinnerLoading />
    );
  }

  return (
    <Container className='rent-container'>
      <Col className={`${!rentComplete ? 'neon' : 'neon-green'}`}></Col>
      <Row className='rent-cart'>
        <Col
          className={`${!rentConfirmation ? 'front-side' : 'front-side-hide'}`}
        >
          <Col className='box-rent-cart'>
            <Col className='tittle-content'>
              <Image src={game.image} alt={`${game.name} cover`}></Image>
              <h4>{game.name}</h4>
              <Badge bg='warning' text='dark'>
                {user
                  ? ((75 / 100) * game.price).toFixed(2)
                  : game.price.toFixed(2)}
                ¥/dzień
              </Badge>
              <Badge
                bg='warning'
                text='dark'
                className={`total ${totalAnimation ? 'total-boom' : ''}`}
              >
                total:{totalCash}¥
              </Badge>
              <div className='icon-box'>
                <IconsPlatform game={game} />
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
        <ConfirmationRent
          game={game}
          rentConfirmation={rentConfirmation}
          rentComplete={rentComplete}
          sendOrderHandle={sendOrderHandle}
          setRentConfirmation={setRentConfirmation}
          userForm={userForm}
          totalCash={totalCash}
        />
        <SuccesOrderCart
          rentComplete={rentComplete}
          mobileMode={mobileMode}
          setRentComplete={setRentComplete}
        />
      </Row>
    </Container>
  );
};

export default rentCart;
