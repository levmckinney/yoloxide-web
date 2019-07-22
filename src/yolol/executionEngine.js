import {deviceToEngineEnv, getLine, contextToVariables} from './converters'

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

// Mutates device
export default function stepDevice(device, wasmExecuteLine, global_context) {
  if(!device.code.codable){
    return
  }
  const enginEnv = deviceToEngineEnv(device)
  enginEnv.global_context = global_context || enginEnv.global_context
  const line = getLine(device.code.yolol, device.code.line)
  console.info("Passing into engin: ", {enginEnv, line, wasmExecuteLine})
  const newEnv = wasmExecuteLine(enginEnv, line);
  console.info("Got back out of engin: ", {newEnv})
  if (newEnv.error !== "") {
    console.warn(newEnv.error)
  }
  const variables = contextToVariables(newEnv.global_context, Object.keys(device.dataFields))
  variables.forEach(({name, value, type}) =>{
    const field = device.dataFields[name]
    field.value = value
    field.type = type
  })
  device.code.localContext = newEnv.local_context
  device.code.line = newEnv.next_line
}
