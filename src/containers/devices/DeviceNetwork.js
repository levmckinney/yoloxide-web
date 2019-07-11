import DeviceNetwork from '../../components/devices/DeviceNetwork'
import { connect } from 'react-redux'
import { addDevice } from '../../actions'
import { getNetwork } from '../getters'

const mapStateToProps = (state, ownProps) => {
  return  {
    network:getNetwork(state, ownProps.networkId)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  addDevice: device => dispatch(addDevice(ownProps.networkId, device))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceNetwork)