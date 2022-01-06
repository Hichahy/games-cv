import Filters from './Filters'
import { connect } from 'react-redux'
import { IStore } from '../../types/IStore'
import { filterSearch, filterVarious, filterPlatform, filterType } from '../../actions/Rental'

const mapStateToProps = (state: IStore) => ({
  games: state.rental.games,
  phrase: state.rental.phrase,
  sort: state.rental.sort,
  platform: state.rental.platform,
  type: state.rental.type
})

export default connect(mapStateToProps, { filterSearch, filterVarious, filterPlatform, filterType })(Filters as any)
