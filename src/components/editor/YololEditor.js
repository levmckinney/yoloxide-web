import React from 'react'
import AceEditor from "react-ace";
import PropTypes from 'prop-types'
import "brace/mode/java";
import "brace/theme/solarized_dark";
import { normalizeLineNumber } from '../../yolol/text'
import './yolol-editor.css'


export default function YololEditor({code:{yolol, line, errors}, executing, setCode}) {
  const onChange = (yolol) => {
    yolol = normalizeLineNumber(yolol)
    setCode({yolol})
  }

  const getMarkers = () => {
    if(executing) {
      return [{ startRow: line - 1, endRow: line, className: 'executing-line', type: 'background' }]
    }
    return []
  }

  const getAnnotations = () => {
    if(executing) {
      let annotations = [{row:line - 1, col:0, type:'info', text:'executing line'}]
      if(errors[0]) {
        annotations.push({row: errors[0].lineNumber - 1, col:0, type:'error', text:errors[0].message})
      }
      return annotations
    }
    return []
  }

  return (<AceEditor
    mode="python"
    theme="solarized_dark"
    onChange={onChange}
    value={normalizeLineNumber(yolol)}
    annotations={getAnnotations()}
    markers={getMarkers()}
    name="UNIQUE_ID_OF_DIV"
    editorProps={{ $blockScrolling: true }}
    readOnly={executing}
    fontSize={18}
    minLines={20}
    maxLines={20}
  />)
}


YololEditor.propTypes = {
  code: PropTypes.object.isRequired,
  executing: PropTypes.bool.isRequired,
  setCode: PropTypes.func.isRequired,
}