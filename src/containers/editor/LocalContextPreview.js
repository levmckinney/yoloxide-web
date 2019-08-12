import LocalContextPreview from '../../components/editor/LocalContextPreview'
import { connect } from 'react-redux'
import { getCode, getDevice } from '../getters';

const mapStateToProps = (state, ownProps) => {
  let {networkId, deviceId} = ownProps
  return {
    code: getCode(state, networkId, deviceId),
    executing: getDevice(state, networkId, deviceId).executing
}}

export default connect(
  mapStateToProps,
)(LocalContextPreview)