import DevicePreview from '../../components/devices/DevicePreview'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => {
  return {device:state.networks[ownProps.networkId].devices[ownProps.deviceId]}
}

export default connect(
  mapStateToProps
)(DevicePreview)