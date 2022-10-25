import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Carousel } from 'react-bootstrap';
import { IGames } from '../../../types/types';

interface IProps {
  game: IGames;
  showScreenHandler: () => void;
}

export const CartGameSlider = ({ game, showScreenHandler }: IProps) => {
  return (
    <>
      <Carousel className='slider-game-cart'>
        {game.screens.map((i) => (
          <Carousel.Item key={uuidv4()}>
            <img src={i} alt='screen gameplay' />
          </Carousel.Item>
        ))}
      </Carousel>
      <div className='overlay' onClick={showScreenHandler}></div>
    </>
  );
};
