export interface IGames {
  id: string;
  name: string;
  image: string;
  description: string;
  availability: boolean;
  platform: string[];
  type: string[];
  screenShot1: string;
  screenShot2: string;
  screenShot3: string;
  price: number;
}

export interface IOrder {
  name: string,
  surname: string,
  adress: string,
  Local: string | number,
  date: number | string,
  age: string | number,
  idGame: string | number
}
