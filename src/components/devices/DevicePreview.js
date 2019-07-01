import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types';


const DevicePreview = ({device:{name, dataFields}, deviceId, networkId, history}) => {
    return (
      <Card key={deviceId} border="secondary">
        <Card.Title>{name}</Card.Title>
        <ListGroup variant="flush">
          {dataFields.map(dataField => {
            return (
              <ListGroup.Item key={dataField.id}>
                {dataField.name}:{dataField.value}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
        <Button variant="primary" onClick={()=>{
          history.push("/edit/" + networkId + "/" + deviceId)
        }}>Edit</Button>
      </Card>
    );
  }

  DevicePreview.propTypes = {
    networkId: PropTypes.string.isRequired,
    deviceId: PropTypes.string.isRequired,
    device: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  export default withRouter(DevicePreview);