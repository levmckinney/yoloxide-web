import DataFieldsEditor from '../../components/editor/DataFieldsEditor'
import { connect } from 'react-redux'
import { addField, removeField} from '../../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    dataFields: state.networks[ownProps.networkId].devices[ownProps.deviceId].dataFields
}}

const mapDispatchToProps = (dispatch, ownProps) => ({
  addField: field => dispatch(addField(ownProps.networkId, ownProps.deviceId, field)),
  removeField: name => dispatch(removeField(ownProps.networkId, ownProps.deviceId, name))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataFieldsEditor)