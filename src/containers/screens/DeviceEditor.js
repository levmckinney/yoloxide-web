import DeviceEditor from '../../components/screens/DeviceEditor'
import { connect } from 'react-redux'
import {setDevice} from '../../actions'

const mapStateToProps = (state, {deviceId, networkId}) => {
  return {
  deviceName:state.networks[networkId].devices[deviceId].name
}}

const mapDispatchToProps = (dispatch, ownProps) => ({
  setDeviceName:name => dispatch(setDevice(ownProps.networkId,{id:ownProps.deviceId, name}))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceEditor)