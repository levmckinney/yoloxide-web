import React, {useState} from 'react'
import FormControl from 'react-bootstrap/FormControl'
import PropTypes from 'prop-types'

const ClickToEdit = ({initValue="", onChange=()=>{}}) => {
  let [state, setState] = useState({value:(initValue)})

  return (
    <React.Fragment>
      <FormControl
      value={state.value}
      onChange={(event)=>{setState({value:event.target.value}); onChange(event)}}
      size='lg'
      style={{outline:'secondary'}}
      plaintext
      />
    </React.Fragment>
  )
}

ClickToEdit.propTypes = {
  initValue: PropTypes.string,
  onChange: PropTypes.func
}

export default ClickToEdit
