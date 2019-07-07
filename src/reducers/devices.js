import { createReducer } from "redux-starter-kit";
import {DATA_FIELD_ACTIONS, DEVICE_ACTIONS} from '../actions'
import dataFields from './dataFields'
import {callInnerReducer} from './utils'
import uuid from 'uuid';

const devices = createReducer({}, {
  [DEVICE_ACTIONS.ADD_DEVICE]: (devices, action) => {
    let defaultDevice = {
      id:uuid.v4(),
      name:"new device",
      dataFields:{},
      isChip:false
    }
    let device = {...defaultDevice, ...(action.device || {})}
    devices[device.id] = device
  },
  [DEVICE_ACTIONS.SET_DEVICE]: (devices, action) => {
    devices[action.device.id] = {...devices[action.device.id], ...action.device}
  },
  ...callInnerReducer(dataFields, 'deviceId', 'dataFields', DATA_FIELD_ACTIONS)
})


export default devices;