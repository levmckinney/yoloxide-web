import React, { Component } from 'react'
import AceEditor from "react-ace";
import PropTypes from 'prop-types'
import "brace/mode/java";
import "brace/theme/solarized_dark";
import Button from "react-bootstrap/Button";


export default class YololEditor extends Component {

  shouldComponentUpdate() {
    return !this.props.code.codable;
  }

  render() {
    const onChange = (yolol) => {
      this.props.setCode({yolol})
    }  

    let {code, makeScriptable} = this.props;
    if(code.codable) {
      return (<AceEditor
          mode="python"
          theme="solarized_dark"
          onChange={onChange}
          value={code.yolol}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
        />)
    } else {
      return(<Button type="primary" size="lg" block onClick={()=>makeScriptable()}>Make Scriptable</Button>) 
    }
  }
}

YololEditor.propTypes = {
  code:PropTypes.object,
  makeScriptable: PropTypes.func.isRequired,
  setCode: PropTypes.func.isRequired,
  networkId: PropTypes.string.isRequired,
  deviceId: PropTypes.string.isRequired
}