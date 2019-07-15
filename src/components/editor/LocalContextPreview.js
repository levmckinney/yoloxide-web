import React from 'react'
import Card from 'react-bootstrap/Card'
import VariableGroup from '../VariableGroupPreview'
import PropTypes from 'prop-types'
import {contextToVariables} from '../../yolol/converters'

export default function LocalContextPreview({code:{codable, localContext}, executing}) {
  console.log("code.codable && executing && code.localeContext", codable , executing , localContext)
  if(codable) {
    return (
      <Card className="text-center" border="secondary">
        <Card.Title>Local Variables</Card.Title>
        { executing && localContext
          ? <VariableGroup variables={contextToVariables(localContext)}/>
          : <React.Fragment/>
        }
      </Card>
    )
  }
  return (<React.Fragment/>)
}

LocalContextPreview.propTypes = {
  code: PropTypes.object.isRequired,
  executing: PropTypes.bool.isRequired,
  networkId: PropTypes.string.isRequired,
  deviceId: PropTypes.string.isRequired
}