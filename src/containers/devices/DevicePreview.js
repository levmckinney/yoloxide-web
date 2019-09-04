import DevicePreview from '../../components/devices/DevicePreview'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getDataFieldsOnDevice, getDevice } from '../../getters';
import { removeDevice } from '../../actions';
import {safeGet} from '../../getters'

const mapStateToProps = (state, ownProps) => {
  let {deviceId} = ownProps
  return {
    dataFields:getDataFieldsOnDevice(state, deviceId), 
    name:safeGet(getDevice(state, deviceId), 'name')}
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
  deviceId: PropTypes.string.isRequired,
}

export default Connected;