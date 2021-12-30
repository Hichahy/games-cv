import './home.scss'
import React from 'react'
import { Carousel } from 'react-bootstrap'

interface IProps {
  mobileMode: boolean;
}

const Home = ({ mobileMode }: IProps) => {
  return (
    <Carousel className="home-container" >
      <Carousel.Item interval={3000}>
        <img
          className="d-flex w-100"
          src={
            mobileMode
              ? '/images/home/homeMobile1.jpg'
              : '/images/home/home1.jpg'
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
              ? '/images/home/homeMobile2.jpg'
              : '/images/home/home2.jpg'
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
              ? '/images/home/homeMobile3.jpg'
              : '/images/home/home3.jpg'
          }
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Rywalizuj, urywaj nocki, baw sie!</h3>
          <p>Nasze gry zapewnią Ci rozrywke na długie godziny.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default Home
