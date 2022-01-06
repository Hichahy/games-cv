import Games from './Games'
import { connect } from 'react-redux'
import { IStore } from '../../types/IStore'
import { loadGames } from '../../actions/Rental'

const mapStateToProps = (state: IStore) => ({
  games: state.rental.games,
  filteredItems: state.rental.filteredItems
})

export default connect(mapStateToProps, { loadGames })(Games as any)
