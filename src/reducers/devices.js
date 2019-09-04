import { createReducer } from "redux-starter-kit"
import {DEVICE_ACTIONS, CODE_ACTIONS} from '../actions'
import code from './code'
import {callInnerReducer} from './utils'
import uuid from 'uuid';
/**
 * {
 *  "asdasda123asda213asadwe":{
 *    id:"asdasda123asda213asadwe" // the id of the device
 *    name: "my new device"
 *    executing: true // if executing
 *    code: {...} //see code
 *  }
 * // ect ...
 * }
 */
const devices = createReducer({}, {
  [DEVICE_ACTIONS.ADD_DEVICE]: (devices, action) => {
    let defaultDevice = {
      id:uuid.v4(),
      name:"new device",
      code:{codable:false},
      executing:false
    }
    let device = {...defaultDevice, ...(action.device || {})}
    devices[device.id] = device
  },
  [DEVICE_ACTIONS.SET_DEVICE]: (devices, action) => {
    devices[action.device.id] = {...devices[action.device.id], ...action.device}
  },
  //TODO this should be renamed to set executing unset executing since it does not actually run the code.
  [DEVICE_ACTIONS.START_EXECUTING]: (devices, action) => {
    const device = devices[action.deviceId]
    if(device.code.codable) {
      device.code.line = 1
      device.code.localContext = {}
    }
    device.executing = true
  },
  [DEVICE_ACTIONS.RESET]: (devices, action) => {
    action.deviceIds.map(id => devices[id]).forEach(device => {
      if(device.code) {
        device.code.line = 0
        device.executing = false
      }
    })
  },
  [DEVICE_ACTIONS.STOP_EXECUTING]: (devices, action) => {
    const device = devices[action.deviceId]
    if(device.code.codable) {
      device.code.line = 1
      device.code.errors = []
      device.code.localContext = {}
    }
    device.executing = false
  },
  [DEVICE_ACTIONS.REMOVE_DEVICE]: (devices, action) => {
    delete devices[action.deviceId]
  },
  ...callInnerReducer(code, 'deviceId', 'code', CODE_ACTIONS)
})

export default devices;