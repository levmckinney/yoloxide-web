import {NETWORK_ACTIONS} from '../actions'
import devices from './devices'
import dataFields from './dataFields'

export const initialNetworks = {
  mainNetworkID:{
    id: "mainNetworkID",
    executing: false,
    devices: {

    }
  }
}

const networks = (networks = initialNetworks, action) => {
  switch (action.type) {
    case NETWORK_ACTIONS.ADD_NETWORK:
      return {...networks, [action.network.id]: action.network}
    case NETWORK_ACTIONS.SET_NETWORK:
      return {...networks, [action.network.id]:{...networks[action.network.id], ...action.network}}
    case NETWORK_ACTIONS.START_EXECUTING:
      return {...networks, [action.networkId]: {...networks[action.networkId], executing: true}}
    case NETWORK_ACTIONS.STOP_EXECUTING:
        return {...networks, [action.networkId]: {...networks[action.networkId], executing: false}}    
    default:
      if(action.networkId && networks[action.networkId]) {
        const networkId = action.networkId, 
              network = networks[networkId]
        return {...networks, [networkId]: {
          ...network, 
          devices:devices(network.devices, action), 
          dataFields:dataFields(network.dataFields, action)}
        }
      }
      return networks
  }
}

export default networks