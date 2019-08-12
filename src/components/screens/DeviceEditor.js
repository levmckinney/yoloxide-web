import React from 'react'
import YololEditor from '../../containers/editor/YololEditor'
import DataFieldsEditor from '../../containers/editor/DataFieldsEditor'
import Container from 'react-bootstrap/Container'
import ClickToEdit from '../util/ClickToEdit'
import PropTypes from 'prop-types'
import DeviceRunner from '../../containers/runnerbars/DeviceRunner'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import LocalContextPreview from '../../containers/editor/LocalContextPreview'

const DeviceEditor = ({setDeviceName, deviceName, networkId, deviceId}) => {    
  return (
    <React.Fragment>
      <DeviceRunner networkId={networkId} deviceId={deviceId}/>
      <Container>
        <ClickToEdit initValue={deviceName} onChange={event => setDeviceName(event.target.value)}/>
        <Row>
          <Col>
            <YololEditor networkId={networkId} deviceId={deviceId}/>
          </Col>
          <Col>
            <DataFieldsEditor deviceId={deviceId} networkId={networkId}/>
          </Col>
          <Col>
            <LocalContextPreview deviceId={deviceId} networkId={networkId}/>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}

DeviceEditor.propTypes = {
  setDeviceName:PropTypes.func.isRequired,
  deviceName:PropTypes.string.isRequired,
  networkId:PropTypes.string.isRequired,
  deviceId:PropTypes.string.isRequired
}

export default DeviceEditor
