import { createReducer } from "redux-starter-kit"
import {DATA_FIELD_DEVICE_ACTIONS, DATA_FIELD_ACTIONS, DEVICE_ACTIONS} from '../actions'


const canAssignDataFields = (networks, deviceId, dataFieldId) => 
  Object.values(networks).some(network => network.devices.includes(deviceId) && network.dataFields.includes(dataFieldId))

/**
 * Think of this as a join table
 * [
 *  {
 *    dataFieldId: "DataFieldIdGoesHere",
 *    deviceId: "DeviceIdGoesHere",
 *    mixCaseName: "mixCaseName"
 *  }
 * ]
 */
const dataFieldDevice = createReducer([], {
  [DATA_FIELD_DEVICE_ACTIONS.ASSIGN_DEVICE_TO_DATA_FIELD]: (dataFieldDevice, {deviceId, dataFieldId, mixCaseName, state:{networks}}) => {
    if(canAssignDataFields(networks, deviceId, dataFieldId)) {
      return [...dataFieldDevice, {dataFieldId, deviceId, mixCaseName}]
    }
    return dataFieldDevice;
  },
  [DATA_FIELD_DEVICE_ACTIONS.UNASSIGN_DEVICE_TO_DATA_FIELD]: (dataFieldDevice, {deviceId, dataFieldId}) => {
    return dataFieldDevice.filter(value => deviceId !== value.deviceId || dataFieldId !== value.dataFieldId)
  },
  [DEVICE_ACTIONS.REMOVE_DEVICE]: (dataFieldDevice, {deviceId}) => {
    return dataFieldDevice.filter(value => deviceId === value.deviceId)
  },
  [DATA_FIELD_ACTIONS.REMOVE_FIELD]: (dataFieldDevices, {dataFieldId}) => {
    return dataFieldDevices.filter(value => value.dataFieldId === dataFieldId)
  }
})

export default dataFieldDevice