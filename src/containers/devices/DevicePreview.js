import DevicePreview from '../../components/devices/DevicePreview'
import { connect } from 'react-redux'
import { getDevice } from '../getters'
import PropTypes from 'prop-types'

const mapStateToProps = (state, ownProps) => {
  let {networkId, deviceId} = ownProps
  return {device:getDevice(state, networkId, deviceId)}
}

const Connected = connect(
  mapStateToProps
)(DevicePreview)

Connected.propTypes = {
  ...Connected.propTypes,
  networkId: PropTypes.string.isRequired,
  deviceId: PropTypes.string.isRequired,
}

export default Connected;