import DevicePreview from '../../components/devices/DevicePreview'
import { connect } from 'react-redux'
import { getDevice } from '../getters';

const mapStateToProps = (state, ownProps) => {
  let {networkId, deviceId} = ownProps
  return {device:getDevice(state, networkId, deviceId)}
}

export default connect(
  mapStateToProps
)(DevicePreview)