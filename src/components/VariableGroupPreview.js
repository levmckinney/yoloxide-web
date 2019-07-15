import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import Variable from './Variable'
import PropTypes from 'prop-types'

export default function VariableGroupPreview({variables}) {
  return (
    <ListGroup variant="flush">
    {variables.map(variable => {
      return (
        <ListGroup.Item key={variable.name}>
          <Variable {...variable}/>
        </ListGroup.Item>
      );
    })}
  </ListGroup>
)
}

Variable.propTypes = {
  variables: PropTypes.array.isRequired
}