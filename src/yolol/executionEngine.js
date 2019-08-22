import {createEngineEnv, getLine, contextToVariables} from './converters'
import {produce} from 'immer'
let wasm;

export async function fetchWasmExecuteLine() {
  if(wasm){
    return wasm.wasm_execute_line
  }
   console.info("loading wasm")
   wasm = await import('yoloxide')
   console.info("wasm loaded", {wasm})
   return wasm.wasm_execute_line
}

export default function stepDevice(device, wasmExecuteLine, dataFields) {
  if(!device.code.codable) {
    return device
  }
  const enginEnv = createEngineEnv(device, dataFields)
  const line = getLine(device.code.yolol, device.code.line)
  console.info("Passing into engin: ", {enginEnv, line, wasmExecuteLine})
  const newEnv = wasmExecuteLine(enginEnv, line);
  console.info("Got back out of engin: ", {newEnv})
  
  const newDevice = produce(device , (device) => {
    if (newEnv.error !== "") {
      device.code.errors.push({message: newEnv.error, lineNumber: device.code.line})
    }
    try {
      const variables = contextToVariables(newEnv.global_context, Object.values(dataFields).map(dataField => dataField.id))
      variables.forEach(({id, value, type}) =>{
        const field = dataFields[id]
        field.value = value
        field.type = type
      })
    } catch(e) {
      device.code.errors.push({message:e.message, lineNumber: device.code.line})
    }
    device.code.localContext = newEnv.local_context
    device.code.line = newEnv.next_line
  })
  return newDevice
}
