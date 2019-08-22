import React, {useState} from 'react'
import {validFieldName, validNumber} from '../../yolol/validators'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import PropTypes from 'prop-types'

export default function AddField({addField}) {
  const [state, setState] = useState({fieldName:"", fieldValue:"", type:'string', validated:false})
  const validValue = (value) => (state.type === 'number' ? validNumber(value) : true)
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false || !validValue(state.fieldValue) || !validFieldName(state.fieldName)) {
      event.stopPropagation();
      return
    }
    addField({id:state.fieldName.toLowerCase(), value:state.fieldValue, type:state.type}, state.fieldName)
    setState({...state, validated: true });
  }
  return (
    <Form
    noValidate
    validated={state.validated}
    onSubmit={e => handleSubmit(e)} 
    >
        <Form.Group> 
        <FormControl
          required
          onChange={(event) => setState({...state, fieldName: event.target.value})}
          isInvalid={!validFieldName(state.fieldName)}
          placeholder="Field's Name"
          aria-label="Field's Name"
          aria-describedby="basic-addon2"
        />
        <Form.Control.Feedback type="invalid">Field names should be lowercase and alphanumeric</Form.Control.Feedback>
        </Form.Group>
        <Form.Group> 
        <FormControl
          required
          onChange={(event) => setState({...state,fieldValue: event.target.value})}
          isInvalid={!validValue(state.fieldValue)}
          placeholder="Start value"
          aria-label="Start value"
          aria-describedby="basic-addon2"
        />
        <Form.Control.Feedback type="invalid">Not a valid YOLOL number</Form.Control.Feedback>
        </Form.Group>
      <DropdownButton
          variant="outline-secondary"
          title={state.type}
          id="input-group-dropdown-2"
          onSelect={(eventKey => setState({...state, type:eventKey}))}
          >
          <Dropdown.Item eventKey={"number"}>number</Dropdown.Item>
          <Dropdown.Item eventKey={"string"}>string</Dropdown.Item>
      </DropdownButton>
      <Button type="submit"> Create </Button>
    </Form>
  )
}

AddField.propTypes = {
  addField: PropTypes.func.isRequired
}