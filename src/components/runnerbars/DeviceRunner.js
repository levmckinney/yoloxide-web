import React, {Component} from "react"
import Button from "react-bootstrap/Button"
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import PropTypes from 'prop-types' 


export default class DeviceRunner extends Component {
  constructor() {
    super()
    this.state = {interval:200, autoStepping:false}
  }

  componentWillUnmount = () => {
    this.stop()
  }

  stopAutoStepping = () => {
    this.setState({autoStepping:false})
    console.log(`Stopping intervalId ${this.intervalId} and state ${JSON.stringify(this.state)}`)
    clearInterval(this.intervalId)
  }
  
  // utility
  startAutoStepping = () => {
    this.intervalId = setInterval(() => {
      const step = this.props.step
      step()
      if(!step()) {
        this.stop()
      }
    }, 
    this.state.interval)
    this.setState({autoStepping:true})
  }

  stop = () => {
    this.stopAutoStepping()
    this.props.stopExecuting()
  }

  stepButton = () => {
    if(this.state.autoStepping) {
      this.stopAutoStepping()
    }
    if(!this.props.executing) {
      this.props.startExecuting()
    }
    this.props.step()
  } 

  start = () => {
    this.startAutoStepping()
    this.props.startExecuting()
  }

  render() {
    const {executing} = this.props 
    const {autoStepping} = this.state

    return (
      <ButtonToolbar>
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
        <Button variant="primary" onClick={this.stepButton}>
          Step
        </Button>
      </ButtonToolbar>
    )  
  
  }
}

DeviceRunner.propTypes = {
  step: PropTypes.func.isRequired,
  startExecuting: PropTypes.func.isRequired,
  stopExecuting: PropTypes.func.isRequired,
}