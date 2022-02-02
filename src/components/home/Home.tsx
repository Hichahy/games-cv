import './home.scss';
import React, { useEffect, useState } from 'react';
import { Carousel, Button, Modal } from 'react-bootstrap';

interface IProps {
  mobileMode: boolean;
}

const Home = ({ mobileMode }: IProps) => {
  const [show, setShow] = useState(false);

  // Warning for user
  useEffect(() => {
    const alerted = localStorage.getItem('alerted') || '';
    if (alerted !== 'yes') {
      setShow(true);
    }
  }, []);

  const handleClose = () => {
    setShow(false);
    localStorage.setItem('alerted', 'yes');
  }

  return (
    <div className="wrapper">
      <div className="modal-alert">
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header>
            <Modal.Title>Uwaga!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Ze wzgledów bezpieczeństwa nie podawaj tu prawdziwych danych
            i haseł. Ta strona to tylko pokaz umiejetnośći programowania w
            react, a nie prawdziwa wypożyczalnia
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>Rozumiem</Button>
          </Modal.Footer>
        </Modal>
      </div>
      <header>
        <img
          src="/image/home/introduce-background.jpg"
          className="introduce-bg"
        />
        <img
          src="/image/home/introduce-foreground.png"
          className="introduce-fg"
        />
        <div className="box-title">
          <h1 className="title">🦐Sajgonka</h1>
          <p>Wypożyczalnia sajgonka to symualcja wypożyczalni gier. </p>
          <p style={{ color: 'rgb(255, 193, 7)', textShadow: '0 0 5px black' }}>Czytaj więcej ↓↓↓</p>
        </div>
      </header>
      <section className="description">
        <ul>
          <li>
            Wczytywyanie gier i logowanie odbywa się tu za pomocą firebase.
          </li>
          <li>Po zalogowaniu użytkownik otrzymuję zniżkę -25%.</li>
          <li>Infromacje o zamawianej grze są wysyłane do firebase.</li>
          <li>Filtrowanie gier.</li>
          <li>
            Data wypożyczonej gry jest przekształcana na liczbę dni i mnożona
            przez cene gry za dzień.
          </li>
          <li>
            Logowanie, rejestracja i formularz przy pożyczaniu są walidowane.
          </li>
          <li>Kod był regularnie wysyłany na github.</li>
          <li>Strona jest responsywna.</li>
          <li>
            W projekcie korzystałem z:{' '}
            <p style={{ color: 'rgb(255, 193, 7)' }}>
              Redux, React, TypeScript, Sass, ES6, Hooks, Bootstrap,
              Responsywność, Eslint, Stylelint.
            </p>
          </li>
        </ul>
      </section>
      <Carousel className="home-container">
        <Carousel.Item interval={3000}>
          <img
            className="d-flex w-100"
            src={
              mobileMode
                ? '/image/home/homeMobile1.jpg'
                : '/image/home/home1.jpg'
            }
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Chcesz być eko 🌿 ? Pożyczaj nie kupuj</h3>
            <p>Graj w najlepsze tytuły!</p>
            <p>Nasze gdy czekają właśnie na Ciebie!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img
            className="d-block w-100"
            src={
              mobileMode
                ? '/image/home/homeMobile2.jpg'
                : '/image/home/home2.jpg'
            }
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Wypożyczalnia gier Sajgonka 🦐</h3>
            <p>Godziny Otwarcia 8:00 do 19:00.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img
            className="d-block w-100"
            src={
              mobileMode
                ? '/image/home/homeMobile3.jpg'
                : '/image/home/home3.jpg'
            }
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Rywalizuj, urywaj nocki, baw sie!</h3>
            <p>Nasze gry zapewnią Ci rozrywke na długie godziny.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Home;
