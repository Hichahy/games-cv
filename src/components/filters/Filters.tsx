import './filters.scss';
import React from 'react';
import { Container, Accordion, FormControl } from 'react-bootstrap';
import { IGames } from '../../types/types';

interface IProps {
  phrase: string;
  sort: string;
  platform: string;
  type: string;
  games: IGames;

  filterSearch: (games: IGames, phrase: string) => void;
  filterVarious: (games: IGames, sort: string) => void;
  filterPlatform: (games: IGames, platform: string) => void;
  filterType: (games: IGames, type: string) => void;
}
const Filters = ({
  games,
  phrase,
  sort,
  platform,
  type,
  filterSearch,
  filterVarious,
  filterPlatform,
  filterType
}: IProps) => {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Filtry</Accordion.Header>
        <Accordion.Body>
          <Container className="filter-container">
            <div className="select-box">
              <label>Tytuł</label>
              <FormControl
                placeholder="..."
                value={phrase}
                onChange={(e) => filterSearch(games, e.target.value)}
              />
            </div>
            <div className="select-box">
              <label>Sortuj według</label>
              <select
                value={sort}
                onChange={(e) => filterVarious(games, e.target.value)}
              >
                <option value="">Ostatnio dodane</option>
                <option value="alphabet">A-Z</option>
                <option value="highest">Najwyższa cena</option>
                <option value="lowest">Najniższa cena</option>
              </select>
            </div>

            <div className="select-box">
              <label>Platforma</label>
              <select
                value={platform}
                onChange={(e) => filterPlatform(games, e.target.value)}
              >
                <option value="">Wszystkie</option>
                <option value="PlayStation 4">Playstation</option>
                <option value="xbox">xbox</option>
                <option value="windows">windows</option>
              </select>
            </div>

            <div className="select-box">
              <label>Gatunek</label>
              <select
                value={type}
                onChange={(e) => filterType(games, e.target.value)}
              >
                <option value="">Wszyskie</option>
                <option value="adventure">adventure</option>
                <option value="survivor">survivor</option>
                <option value="horror">horror</option>
                <option value="action">action</option>
                <option value="rpg">rpg</option>
                <option value="platform">platform</option>
              </select>
            </div>
          </Container>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default Filters;
