import GameCart from './GameCart'
import { connect } from 'react-redux'
import { IStore } from '../../types/IStore'
import { loadGames } from '../../actions/Rental'

const mapStateToProps = (state: IStore) => ({
  games: state.rental.games,
  mobileMode: state.rental.mobileMode,
  loadingFetch: state.rental.loadingFetch
})

export default connect(mapStateToProps, { loadGames })(GameCart)
