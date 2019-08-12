import DataFieldsEditor from '../../components/editor/DataFieldsEditor'
import { connect } from 'react-redux'
import { addField, removeField} from '../../actions'
import { getDevice } from '../getters'
import PropTypes from 'prop-types'

const mapStateToProps = (state, ownProps) => {
  let {networkId, deviceId} = ownProps
  return {
    dataFields: getDevice(state, networkId, deviceId).dataFields
}}

const mapDispatchToProps = (dispatch, ownProps) => ({
  addField: field => dispatch(addField(ownProps.networkId, ownProps.deviceId, field)),
  removeField: name => dispatch(removeField(ownProps.networkId, ownProps.deviceId, name))
})

const Connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(DataFieldsEditor)

Connected.propTypes = {
  ...Connected.propTypes,
  networkId: PropTypes.string.isRequired,
  deviceId: PropTypes.string.isRequired,
}
export default Connected