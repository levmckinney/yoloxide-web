import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import PropTypes from 'prop-types'
import AddField from './AddField'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import Variable from '../util/Variable';

const DataFieldsEditor = ({ dataFields, addField, removeField}) => {
  return (
    <Card className="text-center" border="secondary">
        <Card.Title>Data Fields</Card.Title>
        <ListGroup>
          {Object.values(dataFields).sort((a, b)=>(a.name < b.name ? -1 : 1)).map((dataField) => {
            let {id} = dataField
            return (
              <ListGroup.Item key={dataField.name}>
                <Variable {...dataField}/>
                <Button variant="outline-danger" size="sm" onClick={()=>{removeField(id)}}>Remove</Button>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      <AddField addField={addField}/>
    </Card>
  )
}

DataFieldsEditor.propTypes = {
  dataFields: PropTypes.object.isRequired,
  addField: PropTypes.func.isRequired
}

export default DataFieldsEditor
