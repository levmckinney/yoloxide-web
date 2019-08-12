import React from 'react'
import AceEditor from "react-ace";
import PropTypes from 'prop-types'
import "brace/mode/java";
import "brace/theme/solarized_dark";
import { normalizeLineNumber } from '../../yolol/text';


export default function YololEditor({code:{yolol, line}, executing, setCode}) {
  const onChange = (yolol) => {
    yolol = normalizeLineNumber(yolol)
    setCode({yolol})
  }
  return (<AceEditor
    mode="python"
    theme="solarized_dark"
    onChange={onChange}
    value={normalizeLineNumber(yolol)}
    annotations={executing
                 ? [{row:line - 1, col:0, type:'info', text:'executing here'}]
                 : []}
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