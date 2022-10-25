import './gameCart.scss';
import React, { useEffect, useState } from 'react';
import { Container, Badge, Breadcrumb, Nav, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { useParams, Link } from 'react-router-dom';
import { IGames } from '../../types/types';
import { LinkContainer } from 'react-router-bootstrap';
import { SpinnerLoading } from '../layout/spinnerLoading';
import { CartGameSlider } from '../layout/cartGameSlider';
import { IconsPlatform } from '../layout/iconsPlatform';

interface IProps {
  games: IGames[];
  mobileMode: boolean;
  loadGames: () => void;
  user: null;
}

const GameCart = ({ games, mobileMode, loadGames, user }: IProps) => {
  const [showScreen, setShowScreen] = useState(false);

  // again fetch becouse if refresh state is empy
  useEffect(() => {
    if (games.length < 1) {
      loadGames();
    }
  }, []);

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
    return <SpinnerLoading />;
  }

  return (
    <Container fluid className='container-cart'>
      <Breadcrumb>
        <LinkContainer to='/games'>
          <Nav.Link>Gry</Nav.Link>
        </LinkContainer>
        <span>/</span>
        <Breadcrumb.Item style={{ marginLeft: '10px' }} active>
          {game.name}
        </Breadcrumb.Item>
      </Breadcrumb>
      <section className='game-card-section-1'>
        <div>
          <img src={game.image} alt='Card image' />
        </div>
        <div>
          <h1>{game.name}</h1>
          <p>{game.description}</p>
          <div>
            <h4>Platforma</h4>
            <IconsPlatform game={game}/>
          </div>
          <div>
            <h4>Gatunek</h4>
            {game.type.map((i) => (
              <Badge key={uuidv4()} pill bg='warning' text='dark'>
                {i}
              </Badge>
            ))}
          </div>
        </div>
      </section>
      <section className='game-card-section-2'>
        {game.screens.map((i) => (
          <img
            key={uuidv4()}
            onClick={showScreenHandler}
            src={i}
            alt='screen gameplay'
          />
        ))}
      </section>
      {showScreen
        ? (
        <CartGameSlider showScreenHandler={showScreenHandler} game={game} />
          )
        : null}
      <section className='game-card-section-3'>
        <div>
          <i className='bi bi-cash-coin'></i>
          {user
            ? (
            <p>
              <span>
                {game.price}
              </span>
              {((75 / 100) * game.price).toFixed(2)} ¥ za dzień
            </p>
              )
            : (
            <p>{game.price.toFixed(2)}¥ za dzień</p>
              )}
        </div>
        <Link to={`/rent/${game.id}`}>
          <Button variant='warning'>rezerwuj teraz!</Button>
        </Link>
      </section>
    </Container>
  );
};

export default GameCart;
