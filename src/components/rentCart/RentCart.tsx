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
  const [totalPrice, setTotalPrice] = useState({
    d2: '',
    rentDays: 0
  });
  const [totalAnimation, setTotalAnimation] = useState(false);
  const [rentConfirmation, setRentConfirmation] = useState(false);
  const [rentComplete, setRentComplete] = useState(false);
  const [amountPrice, setAmountPrice] = useState<string>('0');
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

  // Pharams game
  const { id } = useParams();
  const find = () => {
    return games.find((x) => x.id === id);
  };
  const game = find()!;

  onAuthStateChanged(auth, (currentUser: any) => {
    setUser(currentUser);
  });

  useEffect(() => {
    if (games.length < 1) {
      loadGames()
    }
  }, []);

  // -25 % for useres
  useEffect(() => {
    const pricePromotion = game && ((75 / 100) * game.price * totalPrice.rentDays).toFixed(2);
    const normalPrice = game && (game.price * totalPrice.rentDays).toFixed(2);
    if (user) {
      setAmountPrice(pricePromotion)
    } else {
      setAmountPrice(normalPrice)
    }
  }, [totalPrice, game])

  const sendOrderHandle = () => {
    sendData(userForm);
    setRentComplete(true);
  };

  if (games.length < 1) {
    return <SpinnerLoading />;
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
                total:{amountPrice}¥
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
              amountPrice={amountPrice}
              totalAnimation={totalAnimation}
              idGame={game.id}
              gameName={game.name}
              mobileMode={mobileMode}
            />
          </Col>
        </Col>
        {rentConfirmation && !rentComplete
          ? (
          <ConfirmationRent
            game={game}
            sendOrderHandle={sendOrderHandle}
            setRentConfirmation={setRentConfirmation}
            userForm={userForm}
            amountPrice={amountPrice}
          />
            )
          : null}
        {rentComplete
          ? (
          <SuccesOrderCart
            rentComplete={rentComplete}
            mobileMode={mobileMode}
            setRentComplete={setRentComplete}
          />
            )
          : null}
      </Row>
    </Container>
  );
};

export default rentCart;
