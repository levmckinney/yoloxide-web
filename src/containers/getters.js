export const getNetwork = (state = {}, networkId) => {
  return state.networks ? state.networks[networkId] : null
}

export const getDevice = (state = {}, networkId, deviceId) => {
  let network = getNetwork(state, networkId) || {}
  return network.devices ? network.devices[deviceId] : null
}

export const getCode = (state = {}, networkId, deviceId) => {
  let device = getDevice(state, networkId, deviceId)
  return device ? device.code : null
}

export const getDataFields = (state = {}, networkId, deviceId) => {
  let device = getDevice(state, networkId, deviceId)
  return device ? device.dataFields : null
}

export const getField = (state = {}, networkId, deviceId, name) => {
  let dataFields = getDataFields(state, networkId, deviceId)
  return dataFields ? dataFields[name] : null
}

