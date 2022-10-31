import {
  LOAD_GAME,
  SAVE_INFO_ORDERS,
  MOBILE_MODE,
  FILTER_SEARCH,
  FILTER_VARIOUS,
  FILTER_PATFORM,
  FILTER_TYPE,
  SEND_ORDER,
  LOGOUT
} from '../common/types';
import axios from 'axios';
import { IGames, IOrders } from '../types/types';
import firebaseAxios from '../firebaseAxios';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase-config';

const url :any = process.env.REACT_APP_FIREBASE_GET_DATA

export const loadGames = () => async (dispatch: any, getState: any) => {
  let loadingFetch = getState().rental.loadingFetch;
  let data = null
  try {
    await axios.get(
      url
    ).then(
      (res) => { data = res.data }
    ).finally(() => {
      loadingFetch = false
    }
    );
    dispatch({
      type: LOAD_GAME,
      payload: {
        data: data,
        loadingFetch: loadingFetch
      }
    });
  } catch (err) {
    console.log('err', err);
  }
};

export const saveInfoOrders =
  (
    name: string,
    surname: string,
    adress: string,
    local: string | number,
    idGame: string | number,
    date: number | string,
    age: string | number
  ) =>
    (dispatch: any) => {
      try {
        dispatch({
          type: SAVE_INFO_ORDERS,
          payload: { name, surname, adress, local, idGame, date, age }
        });
      } catch (err) {
        console.log('err', err);
      }
    };

export const toggleMobileMode = (mobileMode: boolean) => (dispatch: any) => {
  try {
    dispatch({
      type: MOBILE_MODE,
      payload: { mobileMode }
    });
  } catch (err) {
    console.log('err', err);
  }
};

// Filters

export const filterSearch =
  (filtered: IGames[], phrase: string) => (dispatch: any) => {
    try {
      dispatch({
        type: FILTER_SEARCH,
        payload: {
          phrase: phrase,
          items:
            phrase === ''
              ? filtered
              : filtered.filter((i) =>
                i.name.toLowerCase().includes(phrase.toLowerCase())
              )
        }
      });
    } catch (err) {
      console.log('err', err);
    }
  };

export const filterVarious =
  (filtered: IGames[], sort: string) => (dispatch: any) => {
    const filteredItems = filtered.slice();
    if (sort === 'latest') {
      filteredItems.sort((a: any, b: any) => (a.id > b.id ? 1 : -1));
    } else {
      filteredItems.sort((a: any, b: any) =>
        sort === 'lowest'
          ? a.price > b.price
            ? 1
            : -1
          : sort === 'highest'
            ? a.price < b.price
              ? 1
              : -1
            : sort === 'alphabet'
              ? a.name < b.name
                ? -1
                : 1
              : a.id < b.id
                ? 1
                : -1
      );
    }
    try {
      dispatch({
        type: FILTER_VARIOUS,
        payload: {
          sort: sort,
          items: filteredItems
        }
      });
    } catch (err) {
      console.log('err', err);
    }
  };

export const filterPlatform =
  (filtered: IGames[], platform: string) => (dispatch: any) => {
    try {
      dispatch({
        type: FILTER_PATFORM,
        payload: {
          platfrom: platform,
          items:
            platform === ''
              ? filtered
              : filtered.filter((x) => x.platform.indexOf(platform) >= 0)
        }
      });
    } catch (err) {
      console.log('err', err);
    }
  };

export const filterType =
  (filtered: IGames[], type: string) => (dispatch: any) => {
    try {
      dispatch({
        type: FILTER_TYPE,
        payload: {
          platfrom: type,
          items:
            type === ''
              ? filtered
              : filtered.filter((x) => x.type.indexOf(type) >= 0)
        }
      });
    } catch (err) {
      console.log('err', err);
    }
  };

export const sendData =
  ({ name, surname, date, adress, email, gameName, idGame, price }: IOrders) =>
    (dispatch: any) => {
      const Data = {
        order: {
          name: name,
          adress: adress,
          surname: surname,
          email: email,
          idGame: idGame,
          gameName: gameName,
          date: date,
          price: price
        }
      };
      firebaseAxios.post('/orders.json', Data).then((response) => {
        console.log(response);
      });

      try {
        dispatch({
          type: SEND_ORDER,
          payload: {}
        });
      } catch (err) {
        console.log('err', err);
      }
    };

export const getLogout = () => async (dispatch: any) => {
  await signOut(auth)
  try {
    dispatch({
      type: LOGOUT,
      payload: { }
    });
  } catch (err) {
    console.log('err', err);
  }
};
