import React from "react";
import DevicePreview from "../../containers/devices/DevicePreview";
import CardGroup from "react-bootstrap/CardGroup";
import Card from "react-bootstrap/Card";
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import uuid from 'uuid'

const DeviceNetwork = ({network:{devices, id}, addDevice, history}) => {
    return (
      <CardGroup>
          {Object.values(devices).map(device => {
            return (
                <DevicePreview key={device.id} deviceId={device.id} networkId={id} />
            );
          })}
      <Card border="primary" onClick={() => {
            let deviceId = uuid.v4()
            addDevice({id:deviceId})
            history.push("/edit/" + id + "/" + deviceId)
            }}>
          <Card.Title className="mx-auto" >Add new device</Card.Title>
      </Card>
      </CardGroup>
    );
}


DeviceNetwork.propTypes = {
  networkId: PropTypes.string.isRequired,
  network: PropTypes.object.isRequired,
  addDevice: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

export default withRouter(DeviceNetwork);