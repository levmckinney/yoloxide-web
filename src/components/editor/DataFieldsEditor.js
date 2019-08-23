import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import PropTypes from 'prop-types'
import AddField from './AddField'
import Card from 'react-bootstrap/Card'
import Variable from '../util/Variable';
import RemoveButton from '../util/RemoveButton';

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
                <RemoveButton remove={removeField(id)}/>
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
