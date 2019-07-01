import React, {useState} from 'react'
import PropTypes from 'prop-types'

const ClickToEdit = ({initValue="", onChange=()=>{}}) => {
  let [state, setState] = useState({value:(initValue)})

  return (
    <React.Fragment>
      <input type="text"
      className="form-control"
      value={state.value}
      onChange={(event)=>{setState({value:event.target.value}); onChange(event)}}
      readOnly={state.readOnly}
      />
    </React.Fragment>
  )
}

ClickToEdit.propTypes = {
  initValue: PropTypes.string,
  onChange: PropTypes.func
}

export default ClickToEdit
