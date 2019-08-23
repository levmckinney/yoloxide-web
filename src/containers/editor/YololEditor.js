import YololEditor from '../../components/editor/YololEditor'
import { connect } from 'react-redux'
import { setCode} from '../../actions'
import { getCode, getDevice, safeGet} from '../../getters'
import PropTypes from 'prop-types'

const mapStateToProps = (state, ownProps) => {
  let {networkId, deviceId} = ownProps;
  return {
    executing: safeGet(getDevice(state, networkId, deviceId), 'executing'),
    code: getCode(state, networkId, deviceId)
}}

const mapDispatchToProps = (dispatch, ownProps) => {
  let {networkId, deviceId} = ownProps;  
  return {
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