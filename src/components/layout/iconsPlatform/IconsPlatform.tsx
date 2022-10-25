import React from 'react';
import './iconsPlatform.scss';

export const IconsPlatform = ({ game }: any) => {
  return (
    <div>
      {game.platform.includes('PlayStation 4')
        ? (
        <i className='bi bi-playstation'></i>
          )
        : null}
      {game.platform.includes('xbox') ? <i className='bi bi-xbox'></i> : null}
      {game.platform.includes('windows')
        ? (
        <i className='bi bi-windows'></i>
          )
        : null}
    </div>
  );
};
