import DeviceRunner from '../../components/runnerbars/DeviceRunner'
import { connect } from 'react-redux'
import { stepNetwork, startExecutingNetwork, stopExecutingNetwork} from '../../actions'
import { getNetwork, safeGet } from '../../getters'
import PropTypes from 'prop-types'

const mapStateToProps = (state, ownProps) => {
  let {networkId, deviceId} = ownProps
  return {
    executing: safeGet(getNetwork(state, networkId, deviceId), 'executing')
}}

const mapDispatchToProps = (dispatch, ownProps) => {
  let {networkId, deviceId} = ownProps
  return {
    step:() => dispatch(stepNetwork(networkId)),
    startExecuting: () => dispatch(startExecutingNetwork(networkId, deviceId)),
    stopExecuting: () => dispatch(stopExecutingNetwork(networkId, deviceId))

  }
}

const Connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceRunner)

Connected.propTypes = {
  ...Connected.propTypes,
  networkId: PropTypes.string.isRequired,
}

export default Connected