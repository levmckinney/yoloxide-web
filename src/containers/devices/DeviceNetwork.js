import DeviceNetwork from '../../components/devices/DeviceNetwork'
import { connect } from 'react-redux'
import { addDevice } from '../../actions'

const mapStateToProps = (state, ownProps) => {
  return  {
    network:state.networks[ownProps.networkId]
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  addDevice: device => dispatch(addDevice(ownProps.networkId, device))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceNetwork)