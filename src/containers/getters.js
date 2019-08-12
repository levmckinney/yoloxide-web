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

export const safeGet = (obj, keys, depth=0) => {
  if(!Array.isArray(keys)) {
    keys = [keys]
  }

  if(keys.length === depth) {
    return obj
  } else if(typeof obj === 'object' && obj ) {
    return safeGet(obj[keys[depth]], keys, depth + 1)
  } else {
    return undefined
  }
}