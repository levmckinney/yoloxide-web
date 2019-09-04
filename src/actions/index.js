export const DATA_FIELD_ACTIONS = {
  ADD_FIELD:'ADD_FIELD', 
  SET_FIELD_VALUE:'SET_FIELD_VALUE',
  RESET:'DATA_FIELD::RESET',
  REMOVE_FIELD:'REMOVE_FIELD',
  ASSIGN_ADD_AND_OR_SET:'ASSIGN_ADD_AND_OR_SET',
  UNASSIGN_AND_REMOVE_IF_NO_REFS:'UNASSIGN_AND_REMOVE_IF_NO_REFS', 
}

export const CODE_ACTIONS = {
  MAKE_SCRIPTABLE:'MAKE_SCRIPTABLE', 
  SET_CODE:'SET_CODE'
}

export const DATA_FIELD_DEVICE_ACTIONS = {
  ASSIGN_DEVICE_TO_DATA_FIELD:'DATA_FIELD_DEVICE_ACTIONS::ASSIGN_DATA_FIELD_TO_DEVICE',
  UNASSIGN_DEVICE_TO_DATA_FIELD: 'DATA_FIELD_DEVICE_ACTIONS::UNASSIGN_DATA_FIELD_TO_DEVICE'
}

export const DEVICE_ACTIONS = {
  ADD_DEVICE:'ADD_DEVICE',
  SET_DEVICE:'SET_DEVICE',
  REMOVE_DEVICE: 'REMOVE_DEVICE',
  START_EXECUTING:'START_EXECUTING',
  STOP_EXECUTING:'STOP_EXECUTING',
  STEP_DEVICE:'STEP_DEVICE',
  RESET:'DEVICE_ACTIONS::RESET',
  ...CODE_ACTIONS
}

export const NETWORK_ACTIONS = {
  ADD_NETWORK:'ADD_NETWORK', 
  SET_NETWORK:'SET_NETWORK',
  STEP_NETWORK:'STEP_NETWORK',
  START_EXECUTING: 'NETWORKS::START_EXECUTING',
  STOP_EXECUTING: 'NETWORKS::STOP_EXECUTING'
}

export const SET_UP_ACTIONS = {SET_WASM_EXECUTE_LINE:'SET_WASM_EXECUTE_LINE'}

export const setWasmExecuteLine = (wasmExecuteLine) => ({
  type:SET_UP_ACTIONS.SET_WASM_EXECUTE_LINE,
  wasmExecuteLine
})

export const setNetwork = network => {
  return {
    type:NETWORK_ACTIONS.SET_NETWORK,
    network
  }
}

export const addNetwork = network => {
  return {
    type: NETWORK_ACTIONS.ADD_NETWORK,
    network
  }
}

export const startExecutingNetwork = networkId => {
 return {
   type: NETWORK_ACTIONS.START_EXECUTING,
   networkId
 }
}

export const stopExecutingNetwork = networkId => {
  return {
    type: NETWORK_ACTIONS.STOP_EXECUTING,
    networkId
  }
}

export const stepNetwork = networkId => {
  return {
    type: NETWORK_ACTIONS.STEP_NETWORK,
    networkId
  }
}

export const resetDevices = (deviceIds) => {
  return {
    type: DEVICE_ACTIONS.RESET,
    deviceIds
  }
}

export const stepDevice = (networkId, deviceId) => {
  return {
    type: DEVICE_ACTIONS.STEP_DEVICE,
    networkId,
    deviceId
  }
}

export const setDevice = (networkId, device) => {
  return {
    type:DEVICE_ACTIONS.SET_DEVICE,
    networkId,
    device
  }
}

export const addDevice = (networkId, device) => {
  return {
    type:DEVICE_ACTIONS.ADD_DEVICE,
    networkId,
    device
  }
}

export const makeScriptable = (networkId, deviceId) => {
  return {
    type:CODE_ACTIONS.MAKE_SCRIPTABLE,
    networkId,
    deviceId
  }
}

export const removeDevice = (networkId, deviceId) => {
  return {
    type: DEVICE_ACTIONS.REMOVE_DEVICE,
    networkId,
    deviceId
  }
}

export const unassingDataFieldFromDevice = (deviceId, dataFieldId) => {
  return {
    type: DATA_FIELD_DEVICE_ACTIONS.UNASSIGN_DEVICE_TO_DATA_FIELD,
    deviceId,
    dataFieldId
  }
}

export const assignFieldToDevice = (deviceId, dataFieldId, mixCaseName) => {
  return {
    type: DATA_FIELD_DEVICE_ACTIONS.ASSIGN_DEVICE_TO_DATA_FIELD,
    mixCaseName,
    deviceId,
    dataFieldId
  }
}

export const startExecuting = (networkId, deviceId) => {
  return {
    type:DEVICE_ACTIONS.START_EXECUTING,
    networkId,
    deviceId,
  }
}

export const stopExecuting = (networkId, deviceId) => {
  return {
    type:DEVICE_ACTIONS.STOP_EXECUTING,
    networkId,
    deviceId,
  }
}

export const setCode = (networkId, deviceId, code) => {
  return {
    type:CODE_ACTIONS.SET_CODE,
    networkId,
    deviceId,
    code
  }
}

export const addField = (networkId, dataField) => {
  return {
    type:DATA_FIELD_ACTIONS.ADD_FIELD,
    dataField,
    networkId
  }
}


export const setField = (dataField) => {
  return {
    type:DATA_FIELD_ACTIONS.SET_FIELD_VALUE,
    dataField
  }
}

export const resetFields = (dataFieldIds) => {
  return {
    type: DATA_FIELD_ACTIONS.RESET,
    dataFieldIds
  }
}

export const removeField = (dataFieldId) =>{
  return {
    type:DATA_FIELD_ACTIONS.REMOVE_FIELD,
    dataFieldId
  }
}

export const assignAddAndOrSet = (networkId, deviceId, mixCaseName, dataField={}) => {
  return {
    type:DATA_FIELD_ACTIONS.ASSIGN_ADD_AND_OR_SET,
    networkId,
    deviceId,
    mixCaseName,
    dataField
  }
}