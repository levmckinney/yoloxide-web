import {createEngineEnv, getLine, contextToVariables, YololConversionError} from './converters'
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
  
  const [newDevice, newDataFields] = produce([device, dataFields] , ([device, dataFields]) => {
    if (newEnv.error !== "") {
      device.code.errors.push({message: newEnv.error, lineNumber: device.code.line})
    }
    try {
      const variables = contextToVariables(newEnv.global_context, Object.values(dataFields).map(dataField => dataField.id))
      console.log("creating new setting fields ",{variables})
      variables.forEach(({id, value, type}) =>{
        const field = dataFields[id]
        field.value = value
        field.type = type
      })
    } catch(e) {
      if(e instanceof YololConversionError) {
        device.code.errors.push({message:e.message, lineNumber: device.code.line})
      } else {
        throw e
      }
    }
    device.code.localContext = newEnv.local_context
    device.code.line = newEnv.next_line
  })
  return [newDevice, newDataFields]
}
