import DataFieldsEditor from '../../components/editor/DataFieldsEditor'
import { connect } from 'react-redux'
import { addField, removeField} from '../../actions'
import { getDevice } from '../getters';

const mapStateToProps = (state, ownProps) => {
  let {networkId, deviceId} = ownProps
  return {
    dataFields: getDevice(state, networkId, deviceId).dataFields
}}

const mapDispatchToProps = (dispatch, ownProps) => ({
  addField: field => dispatch(addField(ownProps.networkId, ownProps.deviceId, field)),
  removeField: name => dispatch(removeField(ownProps.networkId, ownProps.deviceId, name))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataFieldsEditor)