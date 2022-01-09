import RentCart from './RentCart'
import { connect } from 'react-redux'
import { IStore } from '../../types/IStore'
import { loadGames } from '../../actions/Rental'

const mapStateToProps = (state: IStore) => ({
  games: state.rental.games
})

export default connect(mapStateToProps, { loadGames })(RentCart as any)
