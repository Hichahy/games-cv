/* eslint-disable import/extensions */
import typeToReducer from 'type-to-reducer'
import {
  LOAD_GAME,
  TOGGLE_MODAL,
  SAVE_INFO_ORDERS,
  MOBILE_MODE,
  FILTER_SEARCH,
  FILTER_VARIOUS,
  FILTER_PATFORM,
  FILTER_TYPE
} from '../common/types'

interface stateRental {
  games: Array<{
    id: number;
    name: string;
    image: string;
  }>;
  orders: Array<{
    id: number;
    name: string;
    lastName: string;
    adress: string;
    local: string | number;
    date: string | number;
    age: string | number;
    idGame: string | number;
  }>;
  modal: boolean;
  mobileMode: boolean;
  phrase: string;
  sort: string;
  platform: string;
  type: string;
  filteredItems: Array<{}>;
}

const initialState: stateRental = {
  games: [],
  orders: [],
  modal: false,
  mobileMode: false,
  phrase: '',
  sort: '',
  platform: '',
  type: '',
  filteredItems: []
}

export const user = typeToReducer(
  {
    [SAVE_INFO_ORDERS]: (state: stateRental, action: any) => ({
      ...state,
      orders: [
        ...state.orders,

        {
          id: state.orders.length,
          name: action.payload.name,
          lastName: action.payload.surname,
          adress: action.payload.adress,
          local: action.payload.local,
          date: action.payload.date,
          age: action.payload.age,
          idGame: action.payload.idGame
        }
      ]
    }),
    [LOAD_GAME]: (state: stateRental, action: any) => ({
      ...state,
      games: action.payload,
      filteredItems: action.payload
    }),

    [MOBILE_MODE]: (state: stateRental, action: any) => ({
      ...state,
      mobileMode: action.payload.mobileMode
    }),

    [TOGGLE_MODAL]: (state: stateRental, action: any) => ({
      ...state,
      modal: action.payload.modal
    }),

    [FILTER_SEARCH]: (state: stateRental, action: any) => ({
      ...state,
      phrase: action.payload.phrase,
      filteredItems: action.payload.items
    }),

    [FILTER_VARIOUS]: (state: stateRental, action: any) => ({
      ...state,
      sort: action.payload.sort,
      filteredItems: action.payload.items
    }),

    [FILTER_PATFORM]: (state: stateRental, action: any) => ({
      ...state,
      platform: action.payload.platform,
      filteredItems: action.payload.items
    }),

    [FILTER_TYPE]: (state: stateRental, action: any) => ({
      ...state,
      type: action.payload.type,
      filteredItems: action.payload.items
    })
  },
  initialState
)

export default user
