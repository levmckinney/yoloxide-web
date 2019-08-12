import { createReducer } from "redux-starter-kit";
import {DATA_FIELD_ACTIONS, DEVICE_ACTIONS, CODE_ACTIONS} from '../actions'
import dataFields from './dataFields'
import code from './code'
import {callInnerReducer} from './utils'
import uuid from 'uuid';

const devices = createReducer({}, {
  [DEVICE_ACTIONS.ADD_DEVICE]: (devices, action) => {
    let defaultDevice = {
      id:uuid.v4(),
      name:"new device",
      dataFields:{},
      code:{codable:false},
      executing:false
    }
    let device = {...defaultDevice, ...(action.device || {})}
    devices[device.id] = device
  },
  [DEVICE_ACTIONS.SET_DEVICE]: (devices, action) => {
    devices[action.device.id] = {...devices[action.device.id], ...action.device}
  },
  [DEVICE_ACTIONS.START_EXECUTING]: (devices, action) => {
    const device = devices[action.deviceId]
    if(device.code.codable) {
      device.code.line = 1
      device.code.localContext = {}
    }
    Object.keys(device.dataFields).forEach(name => {
      let dataField = device.dataFields[name]
      dataField.value = dataField.startValue
      dataField.type = dataField.startType
    })
    device.executing = true
  },
  [DEVICE_ACTIONS.STOP_EXECUTING]: (devices, action) => {
    const device = devices[action.deviceId]
    if(device.code.codable) {
      device.code.line = 1
      device.code.localContext = {}
    }
    Object.keys(device.dataFields).forEach(name => {
      let dataField = device.dataFields[name]
      dataField.value = dataField.startValue
      dataField.type = dataField.startType
    })
    device.executing = false
  },
  ...callInnerReducer(dataFields, 'deviceId', 'dataFields', DATA_FIELD_ACTIONS),
  ...callInnerReducer(code, 'deviceId', 'code', CODE_ACTIONS)
})


export default devices;