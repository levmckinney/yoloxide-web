import YololEditor from '../../components/editor/YololEditor'
import { connect } from 'react-redux'
import { makeScriptable, setCode} from '../../actions'
import { getCode } from '../getters';

const mapStateToProps = (state, ownProps) => {
  let {networkId, deviceId} = ownProps;
  return {
    code: getCode(state, networkId, deviceId)
}}

const mapDispatchToProps = (dispatch, ownProps) => {
  let {networkId, deviceId} = ownProps;  
  return {
    makeScriptable: field => dispatch(makeScriptable(networkId, deviceId)),
    setCode: code => dispatch(setCode(networkId, deviceId, code))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(YololEditor)