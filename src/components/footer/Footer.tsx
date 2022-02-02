import './footer.scss';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <Container className="footer">
      <Row className="foot-box">
        <Col>
          <h2>O nas 🦐</h2>
          <p>
            Sajgonka jest fikcyjną wypożyczalnią gier. Pokazuje w niej moje
            umiejętności w programowaniu react z użyciem Reduxa / API / Bootsrapa / TypeScript / Firebase. Każdy
            użytkownik może założyć konto i otrzymać zniżkę -25% na wybraną grę.
            Jest to symulacja działania internetowej wypożyczalni gier. Kod
            dotępny jest na moim{' '}
            <a style={{ color: '#ffc107' }} target="_blank" href="https://github.com/Hichahy/games-cv" rel="noreferrer">
            <i className="bi bi-github"></i> githubie
            </a>
          </p>
        </Col>
      </Row>
      <Row className="foot-box">
        <h2>Kontakt</h2>
        <span>Unitend States,</span>
        <span>Australia,</span>
        <span>United Kingdom,</span>
        <span>Support,</span>
      </Row>
      <Row className="foot-box">
        <h2>Social</h2>
        <a target="_blank" href="https://www.twitter.com/" rel="noreferrer">
          <i className="bi bi-twitter">
            <span> twitter</span>
          </i>
        </a>
        <a target="_blank" href="https://www.youtube.com/" rel="noreferrer">
          <i className="bi bi-youtube">
            <span> youtube</span>
          </i>
        </a>
        <a target="_blank" href="https://www.instagram.com/" rel="noreferrer">
          <i className="bi bi-instagram">
            <span> instagram</span>
          </i>
        </a>
        <a target="_blank" href="https://www.facebook.com/" rel="noreferrer">
          <i className="bi bi-facebook">
            <span> facebook</span>
          </i>
        </a>
        <a target="_blank" href="https://www.discord.com/" rel="noreferrer">
          <i className="bi bi-discord">
            <span> discord</span>
          </i>
        </a>
      </Row>
    </Container>
  );
};

export default Footer;
