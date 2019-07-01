import Networks from '../../components/screens/Networks'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  networkIds:Object.keys(state.networks)
})

export default connect(
  mapStateToProps
)(Networks)