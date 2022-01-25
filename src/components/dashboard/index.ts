import Dashboard from './Dashboard'
import { connect } from 'react-redux'
import { IStore } from '../../types/IStore'
import { getLogout } from '../../actions/Rental'

const mapStateToProps = (state: IStore) => ({
})

export default connect(mapStateToProps, { getLogout })(Dashboard as any)
