import RentForm from './RentForm'
import { connect } from 'react-redux'
import { IStore } from '../../types/IStore'

const mapStateToProps = (state: IStore) => ({
})

export default connect(mapStateToProps, {})(RentForm as any)
