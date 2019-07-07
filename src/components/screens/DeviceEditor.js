import React from 'react'
import YololEditor from '../editor/YololEditor'
import DataFieldsEditor from '../../containers/editor/DataFieldsEditor'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import ClickToEdit from '../util/ClickToEdit'
import PropTypes from 'prop-types'

const DeviceEditor = ({setDeviceName, deviceName, networkId, deviceId}) => {    
  return (
    <Container>
      <ClickToEdit initValue={deviceName} onChange={event => setDeviceName(event.target.value)}/>
      <Col>
        <YololEditor networkId={networkId} deviceId={deviceId}/>
      </Col>
      <Col>
        <DataFieldsEditor deviceId={deviceId} networkId={networkId}/>
      </Col>
    </Container>
  )
}

DeviceEditor.propTypes = {
  setDeviceName:PropTypes.func.isRequired,
  deviceName:PropTypes.string.isRequired,
  networkId:PropTypes.string.isRequired,
  deviceId:PropTypes.string.isRequired
}

export default DeviceEditor
