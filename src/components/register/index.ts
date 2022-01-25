import Register from './Register'
import { connect } from 'react-redux'
import { IStore } from '../../types/IStore'

const mapStateToProps = (state: IStore) => ({
  mobileMode: state.rental.mobileMode
})

export default connect(mapStateToProps, {})(Register as any)
