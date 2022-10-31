export interface IGames {
  id: string;
  name: string;
  image: string;
  description: string;
  // availability: boolean;
  platform: string[] | string;
  type: string[];
  screens: string[];
  price: number;
}

export interface IOrders {
  name: string;
  surname: string;
  adress: string;
  email: string;
  date: string;
  idGame: string;
  gameName: string;
  price: string;
}

export interface IRentForm {
  name: string;
  surname: string;
  email: string;
  adress: string;
  date: string;
  age: number;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IRegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
}
