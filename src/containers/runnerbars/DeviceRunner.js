import DeviceRunner from '../../components/runnerbars/DeviceRunner'
import { connect } from 'react-redux'
import { stepDevice, startExecuting, stopExecuting} from '../../actions'
import { getDevice } from '../getters'
import PropTypes from 'prop-types'

const mapStateToProps = (state, ownProps) => {
  let {networkId, deviceId} = ownProps
  return {
    device: getDevice(state, networkId, deviceId)
}}

const mapDispatchToProps = (dispatch, ownProps) => {
  let {networkId, deviceId} = ownProps
  return {
    step:() => dispatch(stepDevice(networkId, deviceId)),
    startExecuting: () => dispatch(startExecuting(networkId, deviceId)),
    stopExecuting: () => dispatch(stopExecuting(networkId, deviceId))
  }
}

const Connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceRunner)

Connected.propTypes = {
  ...Connected.propTypes,
  networkId: PropTypes.string.isRequired,
  deviceId: PropTypes.string.isRequired
}

export default Connected