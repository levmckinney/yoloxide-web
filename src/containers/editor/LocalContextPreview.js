import LocalContextPreview from '../../components/editor/LocalContextPreview'
import { connect } from 'react-redux'
import { getCode, getDevice } from '../../getters'
import PropTypes from 'prop-types'

const mapStateToProps = (state, ownProps) => {
  let {deviceId} = ownProps
  return {
    code: getCode(state, deviceId),
    executing: getDevice(state, deviceId).executing
  }
}

const Connected = connect(
  mapStateToProps,
)(LocalContextPreview)

Connected.propTypes = {
  ...Connected.propTypes,
  deviceId: PropTypes.string.isRequired
}

export default Connected