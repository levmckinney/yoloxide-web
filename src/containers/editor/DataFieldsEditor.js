import DataFieldsEditor from '../../components/editor/DataFieldsEditor'
import { connect } from 'react-redux'
import {assignAddAndOrSet, unassignAndRemoveIfNoRefs} from '../../actions'
import PropTypes from 'prop-types'
import { getDataFieldsOnDevice } from '../../getters';

const mapStateToProps = (state, ownProps) => {
  let {networkId, deviceId} = ownProps
  return {
    dataFields: getDataFieldsOnDevice(state, networkId, deviceId)
}}

const mapDispatchToProps = (dispatch, ownProps) => ({
  addField: (field, mixCaseName) => dispatch(assignAddAndOrSet(ownProps.networkId, ownProps.deviceId, mixCaseName, field)),
  removeField: dataFieldId => dispatch(unassignAndRemoveIfNoRefs(ownProps.networkId, ownProps.deviceId, dataFieldId))
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