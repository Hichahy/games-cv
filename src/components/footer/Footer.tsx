import './footer.scss';
import React from 'react';
import { useTranslator } from '../../hooks';
import { Row, Col } from 'react-bootstrap';

const Footer = () => {
  const T = useTranslator();

  return (
    <footer>
      <Row className='footer-box'>
        <Col>
          <h2>O nas 🌯</h2>
          <p>
            {T.aboutUs}{' '}
            <a
              target='_blank'
              href='https://github.com/Hichahy/games-cv'
              rel='noreferrer'
            >
              <i className='bi bi-github'></i> githubie
            </a>
          </p>
        </Col>
      </Row>
      <Row className='footer-box'>
        <h2>Kontakt</h2>
        <p>sajgonka@saj.com</p>
        <p>+12 345 678 910</p>
        <span>Unitend States,</span>
        <span>Australia,</span>
        <span>United Kingdom,</span>
        <span>Poland</span>
      </Row>
      <Row className='footer-box'>
        <h2>Social</h2>
        <a target='_blank' href='https://www.twitter.com/' rel='noreferrer'>
          <i className='bi bi-twitter'>
            <span> twitter</span>
          </i>
        </a>
        <a target='_blank' href='https://www.youtube.com/' rel='noreferrer'>
          <i className='bi bi-youtube'>
            <span> youtube</span>
          </i>
        </a>
        <a target='_blank' href='https://www.instagram.com/' rel='noreferrer'>
          <i className='bi bi-instagram'>
            <span> instagram</span>
          </i>
        </a>
        <a target='_blank' href='https://www.facebook.com/' rel='noreferrer'>
          <i className='bi bi-facebook'>
            <span> facebook</span>
          </i>
        </a>
        <a target='_blank' href='https://www.discord.com/' rel='noreferrer'>
          <i className='bi bi-discord'>
            <span> discord</span>
          </i>
        </a>
      </Row>
    </footer>
  );
};

export default Footer;
