import produce from 'immer'
import {toEngineEnv, getLine, contextToVariables} from './converters'

export default function stepDevice(device, wasmExecuteLine) {
  if(device.code.codable) {
    const enginEnv = toEngineEnv(device)
    const line = getLine(device.code.yolol, device.code.line)
    console.info("Passing into engin: ", {enginEnv, line})
    const newEnv = wasmExecuteLine(enginEnv, line);
    console.info("Got back out of engin: ", {newEnv})
    if (newEnv.error !== "") {
      console.warn(newEnv.error)
    }
    return produce(device , (device) => {
      const variables = contextToVariables(newEnv.global_context, Object.keys(device.dataFields))
      variables.forEach(({name, value}) =>{
        device.dataFields[name].value = value
      })
      device.code.localContext = newEnv.local_context
      device.code.line = newEnv.next_line
    })
  } else {
    console.error("Trying to run something with no code")
  }
}

