import DeviceRunner from '../../components/runnerbars/DeviceRunner'
import { connect } from 'react-redux'
import { setDevice, startExecuting, stopExecuting} from '../../actions'
import { getDevice } from '../getters';

const mapStateToProps = (state, ownProps) => {
  let {networkId, deviceId} = ownProps
  return {
    device: getDevice(state, networkId, deviceId)
}}

const mapDispatchToProps = (dispatch, ownProps) => {
  let {networkId, deviceId} = ownProps
  return {
    setDevice: device => dispatch(setDevice(networkId, device)),
    startExecuting: () => dispatch(startExecuting(networkId, deviceId)),
    stopExecuting: () => dispatch(stopExecuting(networkId, deviceId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceRunner)