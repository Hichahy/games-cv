import React from 'react';
import { Badge, Button, Col, Image, Table } from 'react-bootstrap';
import { IOrders } from '../../../types/types';

interface IProps {
  game: any;
  rentConfirmation: boolean;
  rentComplete: boolean;
  userForm: IOrders;
  totalCash: string;
  sendOrderHandle: () => void;
  setRentConfirmation: (value: boolean) => void;
}

export const ConfirmationRent = ({
  game,
  rentConfirmation,
  rentComplete,
  totalCash,
  userForm,
  sendOrderHandle,
  setRentConfirmation
}: IProps) => {
  return (
    <Col
      className={`${
        rentConfirmation && !rentComplete ? 'back-side' : 'back-side-hide'
      }`}
    >
      <h1>Czy wszystko się zgadza?</h1>
      <div className='confirmation-img-box'>
        <Image src={game.image} alt={`${game.name} cover`}></Image>
        <h4>{game.name}</h4>
      </div>
      <Table size='sm'>
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
      <Badge bg='warning' text='dark'>
        total:{totalCash}¥
      </Badge>
      <div className='confirmation-btn-box'>
        <Button onClick={() => setRentConfirmation(false)} variant='danger'>
          WRÓĆ
        </Button>
        <Button onClick={sendOrderHandle} variant='success'>
          POŻYCZAM
        </Button>
      </div>
    </Col>
  );
};
