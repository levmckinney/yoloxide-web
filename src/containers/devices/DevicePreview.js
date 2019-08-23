import DevicePreview from '../../components/devices/DevicePreview'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getDataFieldsOnDevice, getDevice } from '../../getters';
import { removeDevice } from '../../actions';

const mapStateToProps = (state, ownProps) => {
  let {networkId, deviceId} = ownProps
  return {
    dataFields:getDataFieldsOnDevice(state, networkId, deviceId), 
    name:getDevice(state, networkId, deviceId).name}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    removeDevice: () => dispatch(removeDevice(ownProps.networkId, ownProps.deviceId))
  }
}

const Connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(DevicePreview)

Connected.propTypes = {
  ...Connected.propTypes,
  networkId: PropTypes.string.isRequired,
  deviceId: PropTypes.string.isRequired,
}

export default Connected;