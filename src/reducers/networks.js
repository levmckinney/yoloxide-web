import { createReducer } from "redux-starter-kit";
import {NETWORK_ACTIONS, DEVICE_ACTIONS} from '../actions'
import devices from './devices'
import uuid from "uuid"

export const initialNetworks = {
  mainNetworkID:{
    id: "mainNetworkID",
    devices: {
      shipId:{
        id: "shipId",
        name: "Ship controller",
        dataFields: [{ name: "Heading", value: "Space north", id: uuid.v4() }]
      },
      gunControllerId:{
        id: "gunControllerId",
        name: "Gun controller",
        dataFields: [
          { name: "Target", value: "Battlestar gellactica", id: uuid.v4() }
        ]
      }
    }
  }
}

const callDeviceActions = () => {
  let actions = {}
  Object.values(DEVICE_ACTIONS).forEach((actionType) => {
    Object.assign(actions, {[actionType]:(networks, action) => {
      let modifiedNetwork = {...networks[action.networkId], devices: devices(networks[action.networkId].devices, action)}
      return {...networks, [action.networkId]:modifiedNetwork}
    }})
  })
  return actions
}

const networks = createReducer(initialNetworks, {
  [NETWORK_ACTIONS.ADD_NETWORK]: (state, action) => {
    state.networks[action.network.id] = action.network
  },
  [NETWORK_ACTIONS.SET_NETWORK]: (state, action) => {
    state.networks[action.network.id] = {...networks[action.network.id], ...action.network}
  },
  ...callDeviceActions()
})

export default networks;