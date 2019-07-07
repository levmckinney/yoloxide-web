export const DATA_FIELD_ACTIONS = {ADD_FIELD:'ADD_FIELD', SET_FIELD:'SET_FIELD', REMOVE_FIELD:'REMOVE_FIELD'}

export const DEVICE_ACTIONS = {ADD_DEVICE:'ADD_DEVICE', SET_DEVICE:'SET_DEVICE', ...DATA_FIELD_ACTIONS}

export const NETWORK_ACTIONS = {ADD_NETWORK:'ADD_NETWORK', SET_NETWORK:'SET_NETWORK'}


export const setNetwork = network => {
  return {
    type:NETWORK_ACTIONS.SET_NETWORK,
    network
  }
};

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
}

export const addNetwork = network => {
  return {
    type: NETWORK_ACTIONS.ADD_NETWORK,
    network
  }
};

export const addField = (networkId, deviceId, dataField) => {
  console.log("ran action", networkId, deviceId, dataField)
  return {
    type:DATA_FIELD_ACTIONS.ADD_FIELD,
    networkId,
    deviceId,
    dataField
  }
}


export const setField = (networkId, deviceId, dataField) => {
  return {
    type:DATA_FIELD_ACTIONS.SET_FIELD,
    networkId,
    deviceId,
    dataField
  }
}

export const removeField = (networkId, deviceId, name) =>{
  return {
    type:DATA_FIELD_ACTIONS.REMOVE_FIELD,
    networkId,
    deviceId,
    name
  }
}