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

  async componentDidMount() {
    console.log("starting import")
    this.state.wasm = await import('yoloxide')
    console.log("Imported wasm, :", this.state.wasm)
  }

  startAutoStepping = () => {
    let intervalId = setInterval(() => {
      this.runStep()
      if(!this.runStep()) {
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
    if(!this.props.device.executing) {
      this.props.startExecuting()
    }
    this.stopAutoStepping()
    // this is a hacky solution until stepping is set up as an action
    this.runStep({...this.props.device, executing:true})
  }

  runStep = (device=this.props.device) => {
    const wasmExecuteLine = this.state.wasm.wasm_execute_line
    if (wasmExecuteLine){
      
      this.props.setDevice(executeStepDevice(device, wasmExecuteLine))
      return device.executing
    } else {
      console.warn("Wasm not loaded") 
      return false
    }
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