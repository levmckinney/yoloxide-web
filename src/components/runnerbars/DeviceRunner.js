import React, {Component} from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import PropTypes from 'prop-types' 
import executeStepDevice from '../../yolol/executionEngine'


export default class DeviceRunner extends Component {

  constructor(props) {
    super(props);
    this.state = {
        autoStepping:false,
        interval:200,
        intervalId:null
    };
}

  startAutoStepping = () => {
    let intervalId = setInterval(() => {
      let newDevice = executeStepDevice(this.props.device)
      this.props.setDevice(newDevice)
      if(!newDevice.executing) {
        this.stop()
      }
    }, 
    this.state.interval)
    this.setState({autoStepping:true, intervalId})
  }

  stopAutoStepping = () => {
    this.setState({autoStepping:false})
    clearInterval(this.state.intervalId)
  } 

  start  = () => {
    let { device } = this.props
    console.log({device})
    this.startAutoStepping()
    this.props.startExecuting()
  }
  stop = () => {
    this.stopAutoStepping()
    this.props.stopExecuting()
  }
  step = () => {
    console.log("step",this.props)
    if(!this.props.device.executing) {
      this.props.startExecuting()
    }
    this.stopAutoStepping()
    this.props.setDevice(executeStepDevice(this.props.device))
  }
  render() {
    let {device} = this.props
    let {autoStepping} = this.state
    let code = device.code
    let codable = code.codable
    if (!codable) {
      return <ButtonToolbar/>
    }
    let executing = device.executing

    return (
      <ButtonToolbar>
        <ButtonGroup className="mr-2" style={{background:"dark"}}>
          {!executing 
          ? <Button variant="success" onClick={this.start}>
              Run
            </Button>
          : <Button variant="danger" onClick={this.stop}>
              Stop
            </Button>
          }
          {autoStepping || !executing
            ? <Button variant="secondary" disabled={!executing} onClick={this.stopAutoStepping}>
                Pause
              </Button>
            :  <Button variant="success" onClick={this.startAutoStepping}>
                Play
              </Button>
          }
        </ButtonGroup>
        <Button variant="primary" onClick={this.step}>
          Step
        </Button>
        <label>{`Line: ${code.line}`}</label>
      </ButtonToolbar>
    )  
  }
}

DeviceRunner.propTypes = {
  device: PropTypes.object.isRequired,
  setDevice: PropTypes.func.isRequired,
  startExecuting: PropTypes.func.isRequired,
  stopExecuting: PropTypes.func.isRequired,
  networkId: PropTypes.string.isRequired,
  deviceId: PropTypes.string.isRequired
}