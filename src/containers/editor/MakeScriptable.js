import DataFieldsEditor from '../../components/editor/MakeScriptable'
import { connect } from 'react-redux'
import { makeScriptable } from '../../actions'
import PropTypes from 'prop-types'


const mapDispatchToProps = (dispatch, ownProps) => ({
  makeScriptable: () => dispatch(makeScriptable(ownProps.networkId, ownProps.deviceId)),
})

const Connected = connect(
  undefined,
  mapDispatchToProps
)(DataFieldsEditor)

Connected.propTypes = {
  ...Connected.propTypes,
  networkId: PropTypes.string.isRequired,
  deviceId: PropTypes.string.isRequired,
}
export default Connected