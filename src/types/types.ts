
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

export interface IOrders {
  name: string,
  surname: string,
  adress: string,
  email: string,
  date: string,
  idGame: string,
  gameName: string,
  price: string
}
