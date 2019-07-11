import produce from 'immer'
export default function stepDevice(device) {
  if(device.code.codable) {
    console.log("ran")
    console.log({device})
    return produce(device , (device) => {
    device.code.line += 1
  })
  } else {
    console.log("Trying to run something with no code")
  }
}