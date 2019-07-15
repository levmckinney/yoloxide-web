import produce from 'immer'
import {toEngineEnv, getLine, contextToVariables} from './converters'

export default function stepDevice(device, wasmExecuteLine) {
  if(device.code.codable) {
    const enginEnv = toEngineEnv(device)
    const line = getLine(device.code.yolol, device.code.line)
    console.info("Passing into engin: ", {enginEnv, line})
    const newEnv = wasmExecuteLine(enginEnv, line);
    console.info("Got back out of engin: ", {newEnv})
    return produce(device , (device) => {
      // Object.entries(newEnv.global_context).forEach(([key, field]) => {
      //   const fieldName = key.replace(/^:/g, '')
      //   if(fieldName in device.dataFields) {
      //     // need to get value inside of type wrapper
      //     if(field.StringVal) {
      //       device.dataFields[fieldName].value = field.StringVal
      //     } else if(field.NumberVal){
      //       device.dataFields[fieldName].value = (field.NumberVal/10000).toString()
      //     } else {
      //       throw Error("Invalid type in global env variable has no type")
      //     }
      //   } else {
      //     console.error("trying to write to a field that dose not exist")
      //   }
      // })
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

