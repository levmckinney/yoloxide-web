export const DATA_FIELD_ACTIONS = {
  ADD_FIELD:'ADD_FIELD', 
  SET_FIELD:'SET_FIELD', 
  REMOVE_FIELD:'REMOVE_FIELD',
  ASSIGN_ADD_AND_OR_SET:'ASSIGN_AND_SET', 
  UNASSIGN_AND_REMOVE_IF_NO_REFS:'UNASSIGN_AND_REMOVE_IF_NO_REFS', 
  SET_DATA_FIELDS:'SET_DATA_FIELDS'
}

export const CODE_ACTIONS = {MAKE_SCRIPTABLE:'MAKE_SCRIPTABLE', SET_CODE:'SET_CODE'}

export const DEVICE_ACTIONS = {
  ADD_DEVICE:'ADD_DEVICE',
  SET_DEVICE:'SET_DEVICE',
  START_EXECUTING:'START_EXECUTING',
  STOP_EXECUTING:'STOP_EXECUTING',
  STEP_DEVICE:'STEP_DEVICE',
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
    networkId,
    dataField
  }
}


export const setField = (networkId, dataField) => {
  return {
    type:DATA_FIELD_ACTIONS.SET_FIELD,
    networkId,
    dataField
  }
}

export const removeField = (networkId, name) =>{
  return {
    type:DATA_FIELD_ACTIONS.REMOVE_FIELD,
    networkId,
    name
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

export const unassignAndRemoveIfNoRefs = (networkId, deviceId, dataFieldId) => {
  return {
    type: DATA_FIELD_ACTIONS.UNASSIGN_AND_REMOVE_IF_NO_REFS,
    networkId,
    deviceId,
    dataFieldId
  }
}

export const setDataFields = (networkId, dataFields) => {
  return {
    type: DATA_FIELD_ACTIONS.SET_DATA_FIELDS,
    networkId,
    dataFields
  }
}