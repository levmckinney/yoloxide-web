export const getNetwork = (state = {}, networkId) => {
  return state.networks ? state.networks[networkId] : null
}

export const getDevice = (state = {}, deviceId) => {
  return safeGet(state, ["devices", deviceId])
}

export const getCode = (state = {}, deviceId) => {
  const device = getDevice(state, deviceId)
  return device ? device.code : null
}

export const getDataFieldsOnNetwork = ({networks, dataFields}, networkId) => {
  return safeGet(networks, [networkId, 'dataFields'])
    .map(dataFieldId => dataFields[dataFieldId])
    .reduce((acc, dataField) => {
      acc[dataField.id] = dataField
      return acc
    }, {})
}

export const getField = (state = {}, id) => {
  return state.dataFields ? state.dataFields[id] : null
}

export const getDataFieldsOnDevice = ({dataFieldDevice, dataFields}, deviceId) => {
  return Object.values(dataFieldDevice)
    .filter(value => value.deviceId === deviceId)
    .map(({dataFieldId, mixCaseName}) => ({...dataFields[dataFieldId], name:mixCaseName}))
    .reduce((acc, dataField) => {
      acc[dataField.id] = dataField
      return acc
    }, {})
}

export const getDevicesOnNetworks = (state, networkId) => 
  getNetwork(state, networkId)
  .devices
  .map((deviceId) => getDevice(state, deviceId))

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