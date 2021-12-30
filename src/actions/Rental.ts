import { TOGGLE_MODAL, SAVE_INFO_ORDERS, MOBILE_MODE } from '../common/types'
// import { games } from '../mocks/games'

// export const loadGames = () => (dispatch: any) => {
//   try {
//     dispatch({
//       type: LOAD_GAME,
//       // payload: games
//     })
//   } catch (err) {
//     console.log('err', err)
//   }
// }

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
  (name: string, surname: string, adress: string, local: string | number, idGame: string | number, date: number | string, age: string | number) => (dispatch: any) => {
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
