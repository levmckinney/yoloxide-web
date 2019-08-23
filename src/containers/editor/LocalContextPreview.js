import LocalContextPreview from '../../components/editor/LocalContextPreview'
import { connect } from 'react-redux'
import { getCode, getDevice } from '../../getters'
import PropTypes from 'prop-types'

const mapStateToProps = (state, ownProps) => {
  let {networkId, deviceId} = ownProps
  return {
    code: getCode(state, networkId, deviceId),
    executing: getDevice(state, networkId, deviceId).executing
}}

const Connected = connect(
  mapStateToProps,
)(LocalContextPreview)

Connected.propTypes = {
  ...Connected.propTypes,
  networkId: PropTypes.string.isRequired,
  deviceId: PropTypes.string.isRequired
}

export default Connected