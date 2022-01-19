import RentCart from './RentCart'
import { connect } from 'react-redux'
import { IStore } from '../../types/IStore'
import { loadGames, sendData } from '../../actions/Rental'

const mapStateToProps = (state: IStore) => ({
  games: state.rental.games,
  mobileMode: state.rental.mobileMode
})

export default connect(mapStateToProps, { loadGames, sendData })(RentCart as any)
