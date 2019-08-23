import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types';
import VariableGroup from '../util/VariableGroupPreview'


const DevicePreview = ({name, dataFields, deviceId, networkId, history}) => {
    return (
      <Card key={deviceId} border="secondary">
        <Card.Title>{name}</Card.Title>
        <VariableGroup variables={Object.values(dataFields)}/>
        <Button variant="primary" onClick={()=>{
          history.push("/edit/" + networkId + "/" + deviceId)
        }}>Edit</Button>
      </Card>
    );
  }

  DevicePreview.propTypes = {
    name: PropTypes.string.isRequired,
    dataFields: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  export default withRouter(DevicePreview);