import React, { useState } from 'react'
import CardGroup from 'react-bootstrap/Form'

const DataFeildsEditor = () => {
  let [isEditable, setEditable] = useState(false) 
  return (
    <React.Fragment>
      <input type="text"
      className="form-control"
      value={this.state.value}
      onChange={this.ChangeValue}
      onFocus={() => setEditable(true)}
      readOnly={isEditable}
      />
    </React.Fragment>
  )
}

export default DataFeildsEditor
