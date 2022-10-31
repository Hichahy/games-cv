import './home.scss';
import React, { useEffect, useState, useRef } from 'react';
import { useTranslator } from '../../hooks';
import { homeDescriptionSite } from '../../mocks/homeDescriptionSite';
import { homeCarouselItem } from '../../mocks/homeCarouselItem';
import { Carousel, Button, Modal } from 'react-bootstrap';

interface IProps {
  mobileMode: boolean;
}

const Home = ({ mobileMode }: IProps) => {
  const [show, setShow] = useState(false);

  const T = useTranslator();

  // cookie for user
  useEffect(() => {
    const alerted = localStorage.getItem('alerted') || '';
    if (alerted !== 'yes') {
      setShow(true);
    }
  }, []);

  const handleClose = () => {
    setShow(false);
    localStorage.setItem('alerted', 'yes');
  };

  // go to description REF
  const descriptionRef = useRef<HTMLDivElement>(null);
  const executeScroll = () => {
    descriptionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='home-container'>
      <div>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop='static'
          keyboard={false}
        >
          <Modal.Header>
            <Modal.Title>Uwaga!</Modal.Title>
          </Modal.Header>
          <Modal.Body>{T.cookieDescription}</Modal.Body>
          <Modal.Footer>
            <Button variant='primary' onClick={handleClose}>
              Rozumiem
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <header>
        <img
          src='/image/home/introduce-background.jpg'
          className='introduce-bg'
        />
        <img
          src='/image/home/introduce-foreground.png'
          className='introduce-fg'
        />
        <div>
          <h1>{T.companyName}</h1>
          <p>{T.introduceCompany}</p>
          <p onClick={executeScroll}>Czytaj więcej ↓↓↓</p>
        </div>
      </header>
      <section ref={descriptionRef}>
        <ul>
          {homeDescriptionSite.map((i) => (
            <li key={i.id}>{i.desription}</li>
          ))}
          <span>{T.skills}</span>
        </ul>
      </section>
      <Carousel data-testid='carousel' className='home-carousel'>
        {homeCarouselItem.map((i) => (
          <Carousel.Item interval={3000} key={i.id}>
            <img src={mobileMode ? i.img2 : i.img1} alt={i.tittle} />
            <Carousel.Caption>
              <h3>{i.tittle}</h3>
              <p>{i.desription}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Home;
