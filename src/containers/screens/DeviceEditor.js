import DeviceEditor from '../../components/screens/DeviceEditor'
import { connect } from 'react-redux'
import {setDevice} from '../../actions'
import PropTypes from 'prop-types'
import { getDevice, safeGet } from '../getters';

const mapStateToProps = (state, {deviceId, networkId}) => {
  return {
  deviceName:safeGet(getDevice(state, networkId, deviceId), 'name')
}}

const mapDispatchToProps = (dispatch, ownProps) => ({
  setDeviceName:name => dispatch(setDevice(ownProps.networkId,{id:ownProps.deviceId, name}))
})

const Connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceEditor)

Connected.propTypes = {
  ...Connected.propTypes,
  networkId:PropTypes.string.isRequired,
  deviceId:PropTypes.string.isRequired
}

export default Connected