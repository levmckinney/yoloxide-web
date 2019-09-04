import networks from './networks'
import dataFields from './dataFields'
import devices from './devices'
import dataFieldDevice from './dataFieldDevice'

export default (state, action) => ({
  networks: networks(state.networks, action),
  dataFields: dataFields(state.dataFields, action),
  devices: devices(state.devices, action),
  dataFieldDevice: dataFieldDevice(state.dataFieldDevice, {...action, state:state})
})
