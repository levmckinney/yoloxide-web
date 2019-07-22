import YololEditor from '../../components/editor/YololEditor'
import { connect } from 'react-redux'
import { makeScriptable, setCode} from '../../actions'
import { getCode } from '../getters'
import PropTypes from 'prop-types'

const mapStateToProps = (state, ownProps) => {
  let {networkId, deviceId} = ownProps;
  return {
    code: getCode(state, networkId, deviceId)
}}

const mapDispatchToProps = (dispatch, ownProps) => {
  let {networkId, deviceId} = ownProps;  
  return {
    makeScriptable: () => dispatch(makeScriptable(networkId, deviceId)),
    setCode: code => dispatch(setCode(networkId, deviceId, code))
  }
}

const Connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(YololEditor)

Connected.propTypes = {
  ...Connected.propTypes,
  networkId: PropTypes.string.isRequired,
  deviceId: PropTypes.string.isRequired
}

export default Connected