import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import PropTypes from 'prop-types'
import AddField from './AddField'
import Button from 'react-bootstrap/Button';

const DataFieldsEditor = ({ dataFields, addField, removeField}) => {
  return (
    <React.Fragment>
        <ListGroup>
          {Object.values(dataFields).map(dataField => {
            let {name, value} = dataField
            return (
              <ListGroup.Item key={name}>
                {name}:{value} {'   '}
                <Button variant="outline-danger" size="sm" onClick={()=>{removeField(name)}}>Remove</Button>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      <AddField addField={addField}/>
    </React.Fragment>
  )
}

DataFieldsEditor.propTypes = {
  networkId: PropTypes.string.isRequired,
  deviceId: PropTypes.string.isRequired,
  dataFields: PropTypes.object.isRequired,
  addField: PropTypes.func.isRequired
}

export default DataFieldsEditor
