import DeviceNetwork from '../../components/devices/DeviceNetwork'
import { connect } from 'react-redux'
import { addDevice } from '../../actions'
import { getNetwork } from '../getters'
import {PropTypes} from 'prop-types'

const mapStateToProps = (state, ownProps) => {
  return  {
    network:getNetwork(state, ownProps.networkId)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  addDevice: device => dispatch(addDevice(ownProps.networkId, device))
})

const Connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceNetwork)


Connected.propTypes = {
  ...Connected.propTypes,
  networkId: PropTypes.string.isRequired
}

export default Connected