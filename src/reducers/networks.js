import { createReducer } from "redux-starter-kit";
import {NETWORK_ACTIONS, DEVICE_ACTIONS} from '../actions'
import devices from './devices'
import {callInnerReducer} from './utils'
import uuid from "uuid"

export const initialNetworks = {
  mainNetworkID:{
    id: "mainNetworkID",
    devices: {
      shipId:{
        id: "shipId",
        name: "Ship controller",
        dataFields: {Heading:{ name: "Heading", value: "Space north"}}
      },
      gunControllerId:{
        id: "gunControllerId",
        name: "Gun controller",
        dataFields: {
          Target:{ name: "Target", value: "Battlestar gellactica", id: uuid.v4() }
        }
      }
    }
  }
}

const networks = createReducer(initialNetworks, {
  [NETWORK_ACTIONS.ADD_NETWORK]: (state, action) => {
    state.networks[action.network.id] = action.network
  },
  [NETWORK_ACTIONS.SET_NETWORK]: (state, action) => {
    state.networks[action.network.id] = {...networks[action.network.id], ...action.network}
  },
  ...callInnerReducer(devices, 'networkId', 'devices', DEVICE_ACTIONS)
})

export default networks;