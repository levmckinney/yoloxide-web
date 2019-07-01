import { createReducer } from "redux-starter-kit";
import uuid from 'uuid';

const devices = createReducer({}, {
  ADD_DEVICE: (devices, action) => {
    let defaultDevice = {
      id:uuid.v4(),
      name:"new device",
      dataFields:[],
      isChip:false
    }
    console.log("action.device", action.device)
    let device = {...defaultDevice, ...(action.device || {})}
    console.log("final device", device)
    devices[device.id] = device
  },
  SET_DEVICE: (devices, action) => {
    devices[action.device.id] = {...devices[action.device.id], ...action.device}
  }
})


export default devices;