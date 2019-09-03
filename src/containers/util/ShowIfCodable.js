import ShowIfCodable from '../../components/util/ShowIfTrue'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCode, safeGet } from '../../getters'

const mapStateToProps = (state, {deviceId}) => ({
  bool: safeGet(getCode(state, deviceId), 'codable')
})


const Connected = connect(
  mapStateToProps
)(ShowIfCodable)

Connected.propTypes = {
  ...Connected.propTypes,
  networkId:PropTypes.string.isRequired,
  deviceId:PropTypes.string.isRequired
}

export default Connected