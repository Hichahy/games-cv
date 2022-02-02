import Home from './Home'
import { connect } from 'react-redux'
import { IStore } from '../../types/IStore'

const mapStateToProps = (state: IStore) => ({
  mobileMode: state.rental.mobileMode
})

export default connect(mapStateToProps, { })(Home as any)
