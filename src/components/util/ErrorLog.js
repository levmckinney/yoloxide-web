import React, {Component} from 'react'
import Form from 'react-bootstrap/Form'
import './error-log.css'

export default class ErrorLog extends Component {
  constructor(props) {
      super(props);

      this.textLog = React.createRef();
  }

  componentDidUpdate() {
      this.textLog.current.scrollTop = this.textLog.current.scrollHeight;
  }

  render(){
    const {errors} = this.props
    let errorString = ""
    if(errors) {
      errorString = errors.reduce((acc, cur) => acc + `[Line ${cur.lineNumber}]: ${cur.message} \n`, "")
    }
    errorString = errorString.replace(/\n^/,'')
    return (
      <Form.Control ref={this.textLog} as="textarea" rows="6" readOnly value={errorString}/>
    )
  }
}
