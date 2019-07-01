export const NETWORK_ACTIONS = {ADD_NETWORK:'ADD_NETWORK', SET_NETWORK:'SET_NETWORK'}

export const DEVICE_ACTIONS = {ADD_DEVICE:'ADD_DEVICE', SET_DEVICE:'SET_DEVICE'}

export const DATA_FIELD_ACTIONS = {ADD_FIELD:'ADD_FIELD', SET_FIELD:'SET_FIELD', REMOVE_FIELD:'REMOVE_FIELD'}

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

