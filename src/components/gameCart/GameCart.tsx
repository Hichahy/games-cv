import './gameCart.scss';
import React, { useEffect, useState } from 'react';
import {
  Container,
  Spinner,
  Badge,
  Breadcrumb,
  Nav,
  Carousel,
  Button
} from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { IGames } from '../../types/types';
import { LinkContainer } from 'react-router-bootstrap';
import { v4 as uuidv4 } from 'uuid';

interface IProps {
  games: IGames[];
  mobileMode: boolean;
  loadGames: () => void;
}

const GameCart = ({ games, mobileMode, loadGames }: IProps) => {
  const [showScreen, setShowScreen] = useState(false);

  useEffect(() => {
    loadGames();
  }, [loadGames]);

  useEffect(() => {
    if (mobileMode) {
      setShowScreen(true);
    } else {
      setShowScreen(false);
    }
  }, [mobileMode]);

  const { id } = useParams();

  const find = () => {
    return games.find((x) => x.id === id);
  };

  const game = find()!;

  const showScreenHandler = () => {
    setShowScreen((prev) => !prev);
  };

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
    <Container fluid className="container-cart">
      <Breadcrumb className="breadcrumb">
        <LinkContainer to="/games">
          <Nav.Link>Gry</Nav.Link>
        </LinkContainer>
        <span style={{ color: 'white' }}>/</span>
        <Breadcrumb.Item style={{ marginLeft: '10px' }} active>
          {game.name}
        </Breadcrumb.Item>
      </Breadcrumb>
      <section className="cart-section1">
        <div className="cart-box1">
          <img className="image-cart" src={game.image} alt="Card image" />
        </div>
        <div className="cart-box2">
          <h1>{game.name}</h1>
          <p>{game.description}</p>
          <div>
            <h4>Platforma</h4>
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
          </div>
          <div>
            <h4>Gatunek</h4>
            {game.type.map((i) => (
              <Badge key={uuidv4()} pill bg="warning" text="dark">
                {i}
              </Badge>
            ))}
          </div>
        </div>
      </section>
      <section className="screen-pc">
        <img
          onClick={showScreenHandler}
          src={game.screenShot1}
          alt="First slide"
        />
        <img
          onClick={showScreenHandler}
          src={game.screenShot2}
          alt="Second slide"
        />
        <img
          onClick={showScreenHandler}
          src={game.screenShot3}
          alt="Third slide"
        />
      </section>
      {showScreen
        ? (
        <>
          <Carousel className="show-slider">
            <Carousel.Item>
              <img src={game.screenShot1} alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img src={game.screenShot2} alt="Second slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img src={game.screenShot3} alt="Third slide" />
            </Carousel.Item>
          </Carousel>
          <div className="overlay" onClick={showScreenHandler}></div>
        </>
          )
        : null}
      <section className="reckoning">
        <div>
          <i className="bi bi-cash-coin"></i>
          <span>{game.price} ¥ za dzień</span>
        </div>
        <Link to={`/rent/${game.id}`}>
          <Button variant="warning">rezerwuj teraz!</Button>{' '}
        </Link>
      </section>
    </Container>
  );
};

export default GameCart;
