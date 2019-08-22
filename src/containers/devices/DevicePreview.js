import DevicePreview from '../../components/devices/DevicePreview'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getDataFieldsOnDevice, getDevice } from '../../getters';

const mapStateToProps = (state, ownProps) => {
  let {networkId, deviceId} = ownProps
  return {dataFields:getDataFieldsOnDevice(state, networkId, deviceId), name:getDevice(state, networkId, deviceId)}
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