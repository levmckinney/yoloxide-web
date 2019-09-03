import {NETWORK_ACTIONS, DEVICE_ACTIONS, DATA_FIELD_ACTIONS} from '../actions'

export const initialNetworks = {
  mainNetworkID:{
    id: "mainNetworkID",
    executing: false,
    devices: [
      // device Ids
    ],
    dataFields: [
      // dataField Ids
    ]
  }
}

const networks = (networks = initialNetworks, action) => {
  if(action.networkId) {
    var network = networks[action.networkId]
  }

  switch (action.type) {
    case NETWORK_ACTIONS.ADD_NETWORK:
      return {...networks, [action.network.id]: action.network}
    case NETWORK_ACTIONS.SET_NETWORK:
      return {...networks, [action.network.id]:{...networks[action.network.id], ...action.network}}
    case NETWORK_ACTIONS.START_EXECUTING:
      return {...networks, [action.networkId]: {...networks[action.networkId], executing: true}}
    case NETWORK_ACTIONS.STOP_EXECUTING:
        return {...networks, [action.networkId]: {...networks[action.networkId], executing: false}}
    case DEVICE_ACTIONS.ADD_DEVICE:
      var device = action.device;
      return {...networks, [action.networkId]: {...network, devices: [...network.devices, device.id]}}
    case DEVICE_ACTIONS.REMOVE_DEVICE:
      return {...networks, [action.networkId]: {...network, devices:network.devices.filter(id => id !== action.networkId)}}
    case DATA_FIELD_ACTIONS.ADD_FIELD:
      return {...networks, [action.networkId]: {...network, dataFields:[...network.dataFields, action.dataField.id]}}
    case DATA_FIELD_ACTIONS.REMOVE_FIELD:
        return {
          ...networks, 
          [action.networkId]: {
            ...network, 
            dataFields:network.dataFields.filter(id => id !== action.dataFieldId)
          }
        }
    default:
      return networks
  }
}

export default networks