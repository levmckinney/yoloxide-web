import React, {useState} from "react"
import Button from "react-bootstrap/Button"
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import PropTypes from 'prop-types' 


export default function DeviceRunner ({step, startExecuting, stopExecuting, executing}) {
  const [state, setState] = useState({interval:0.2, autoStepping:false, intervalId:null})
  const {interval, autoStepping, intervalId} = state
  const startAutoStepping = () => {
    const intervalId = setInterval(() => {
      step()
      if(!step()) {
        stop()
      }
    }, 
    interval)
    setState({autoStepping:true, intervalId})
  }

  const stepButton = () => {
    if(autoStepping) {
      stopAutoStepping()
    }
    if(!executing) {
      startExecuting()
    }
    step()
  }

  const stopAutoStepping = () => {
    setState({autoStepping:false})
    clearInterval(intervalId)
  } 

  const start = () => {
    startAutoStepping()
    startExecuting()
  }
  const stop = () => {
    stopAutoStepping()
    stopExecuting()
  }

  return (
    <ButtonToolbar>
      {!executing 
      ? <Button variant="success" onClick={start}>
          Run
        </Button>
      : <Button variant="danger" onClick={stop}>
          Stop
        </Button>
      }
      {autoStepping || !executing
        ? <Button variant="secondary" disabled={!executing} onClick={stopAutoStepping}>
            Pause
          </Button>
        :  <Button variant="success" onClick={startAutoStepping}>
            Play
          </Button>
      }
      <Button variant="primary" onClick={stepButton}>
        Step
      </Button>
    </ButtonToolbar>
  )  
}


DeviceRunner.propTypes = {
  step: PropTypes.func.isRequired,
  startExecuting: PropTypes.func.isRequired,
  stopExecuting: PropTypes.func.isRequired,
}