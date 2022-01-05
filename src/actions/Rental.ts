/* eslint-disable import/extensions */
import {
  LOAD_GAME,
  TOGGLE_MODAL,
  SAVE_INFO_ORDERS,
  MOBILE_MODE
} from '../common/types'
import axios from 'axios'

export const loadGames = () => async (dispatch: any) => {
  try {
    const res = await axios.get(
      'https://games-rental-83316-default-rtdb.europe-west1.firebasedatabase.app/games.json'
    )
    dispatch({
      type: LOAD_GAME,
      payload: res.data
    })
  } catch (err) {
    console.log('err', err)
  }
}

export const toggleOpenModal =
  (modal: boolean, id: number) => (dispatch: any) => {
    try {
      dispatch({
        type: TOGGLE_MODAL,
        payload: { modal: !modal, id }
      })
    } catch (err) {
      console.log('err', err)
    }
  }

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
        })
      } catch (err) {
        console.log('err', err)
      }
    }

export const toggleMobileMode = (mobileMode: boolean) => (dispatch: any) => {
  try {
    dispatch({
      type: MOBILE_MODE,
      payload: { mobileMode }
    })
  } catch (err) {
    console.log('err', err)
  }
}
