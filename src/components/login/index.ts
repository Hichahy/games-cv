import Login from './Login'
import { connect } from 'react-redux'
import { IStore } from '../../types/IStore'

const mapStateToProps = (state: IStore) => ({
})

export default connect(mapStateToProps, {})(Login as any)
