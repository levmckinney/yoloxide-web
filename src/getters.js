export const getNetwork = (state = {}, networkId) => {
  return state.networks ? state.networks[networkId] : null
}

export const getDevice = (state = {}, networkId, deviceId) => {
  const network = getNetwork(state, networkId)
  return safeGet(network, ["devices", deviceId])
}

export const getCode = (state = {}, networkId, deviceId) => {
  const device = getDevice(state, networkId, deviceId)
  return device ? device.code : null
}

export const getDataFields = (state = {}, networkId) => {
  const network = getNetwork(state, networkId)
  return safeGet(network, ["dataFields"])
}

export const getField = (state = {}, id) => {
  return state.dataFields ? state.dataFields[id] : null
}

export const getDataFieldsOnDevice = (state = {}, networkId, deviceId) => {
  const dataFields = getDataFields(state, networkId, deviceId);
  const mixCaseNameToDataFields = Object.values(dataFields).reduce((acc, dataField) => {
    if(dataField.refs[deviceId]) {
      const { mixCaseName } = dataField.refs[deviceId]
      acc[mixCaseName] = {...dataField, name: mixCaseName}
    }
    return acc
  }, {})
  return mixCaseNameToDataFields
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