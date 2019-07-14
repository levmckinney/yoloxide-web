import produce from 'immer'
import {wasm_execute_line} from 'yoloxide'

export default function stepDevice(device) {
  if(device.code.codable) {
    const enginEnv = translateToEnginEnv(device)
    let lines = device.code.yolol.split('\n')
    lines = lines.map(line => line + '\n').filter((line, i, lines) => !(line === '' && i === lines.length - 1))
    const newEnv = wasm_execute_line(enginEnv, lines[enginEnv.next_line]);
    return produce(device , (device) => {
      Object.entries(newEnv.global_context).forEach(([key, value]) => {
        const fieldName = key.replace(/^:/g, '')
        if(fieldName in device.dataFields) {
          device.dataFields[fieldName].value = value
        } else {
          console.error("trying to write to a field that dose not exist")
        }
      });
      device.code.localContext = newEnv.local_context
      device.code.line = newEnv.next_line
    })
  } else {
    console.error("Trying to run something with no code")
  }
}

function translateToEnginEnv(device) {
  const {name, code:{line, localContext}, dataFields} = device

  let state = {
    name,
    next_line:line,
    error:"",
    local_context: localContext,
    global_context: Object.values(dataFields).reduce((acc, {name, value}) => {
      return acc[':'+name] = value
    })
  }

  return state
}