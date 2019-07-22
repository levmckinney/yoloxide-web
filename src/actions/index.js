import { getDevice } from "../containers/getters";
import { fetchWasmExecuteLine } from "../yolol/executionEngine";

export const DATA_FIELD_ACTIONS = {ADD_FIELD:'ADD_FIELD', SET_FIELD:'SET_FIELD', REMOVE_FIELD:'REMOVE_FIELD'}

export const CODE_ACTIONS = {MAKE_SCRIPTABLE:'MAKE_SCRIPTABLE', SET_CODE:'SET_CODE'}

export const DEVICE_ACTIONS = {
  ADD_DEVICE:'ADD_DEVICE',
  SET_DEVICE:'SET_DEVICE',
  START_EXECUTING:'START_EXECUTING',
  STOP_EXECUTING:'STOP_EXECUTING',
  STEP_DEVICE:'STEP_DEVICE',
  ...CODE_ACTIONS,
  ...DATA_FIELD_ACTIONS
}

export const NETWORK_ACTIONS = {ADD_NETWORK:'ADD_NETWORK', SET_NETWORK:'SET_NETWORK'}

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
};

export const addNetwork = network => {
  return {
    type: NETWORK_ACTIONS.ADD_NETWORK,
    network
  }
};

export const stepDevice = (networkId, deviceId) => {
  return (dispatch, getState) => 
    fetchWasmExecuteLine().then(wasmExecuteLine => {
      dispatch({
        type: DEVICE_ACTIONS.STEP_DEVICE,
        networkId,
        deviceId,
        wasmExecuteLine
      })
      // return as part of the promise if the device has stopped executing
      const device = getDevice(getState(), networkId, deviceId)
      console.log(device)
      return device && device.executing
  })
}

export const setDevice = (networkId, device) => {
  return {
    type:DEVICE_ACTIONS.SET_DEVICE,
    networkId,
    device
  }
};

export const addDevice = (networkId, device) => {
  return {
    type:DEVICE_ACTIONS.ADD_DEVICE,
    networkId,
    device
  }
};

export const makeScriptable = (networkId, deviceId) => {
  return {
    type:CODE_ACTIONS.MAKE_SCRIPTABLE,
    networkId,
    deviceId
  }
};

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

export const addField = (networkId, deviceId, dataField) => {
  return {
    type:DATA_FIELD_ACTIONS.ADD_FIELD,
    networkId,
    deviceId,
    dataField
  }
};


export const setField = (networkId, deviceId, dataField) => {
  return {
    type:DATA_FIELD_ACTIONS.SET_FIELD,
    networkId,
    deviceId,
    dataField
  }
};

export const removeField = (networkId, deviceId, name) =>{
  return {
    type:DATA_FIELD_ACTIONS.REMOVE_FIELD,
    networkId,
    deviceId,
    name
  }
};