import {DEVICE_ACTIONS, setDevice, setDataFields, NETWORK_ACTIONS, startExecuting, stopExecuting} from '../actions'
import {withLatestFrom, scan, ignoreElements, mergeMap} from 'rxjs/operators'
import {from} from 'rxjs'
import stepDevice, { fetchWasmExecuteLine } from '../yolol/executionEngine';
import { ofType, combineEpics } from 'redux-observable';
import { getDevice, getDataFields, safeGet, getNetwork, getCode } from '../getters';
import {performance} from '../'

export const stepDeviceEpic = (action$, state$) => action$.pipe(
  ofType(DEVICE_ACTIONS.STEP_DEVICE),
  withLatestFrom(from(fetchWasmExecuteLine())),
  withLatestFrom(state$),
  mergeMap(([[action, wasmExecuteLine], state]) => {
    const device = getDevice(state, action.networkId, action.deviceId),
          dataFields = getDataFields(state, action.networkId)
    console.log('step Device Epic executing', {action, wasmExecuteLine, device, dataFields})
    const [newDevice, newDataFields] = stepDevice(device,
                                 wasmExecuteLine,
                                 dataFields)
    return [setDevice(action.networkId, newDevice), setDataFields(action.networkId, newDataFields)]
  })
)

export const startExecutingNetworkEpic = (action$, state$) => action$.pipe(
  ofType(NETWORK_ACTIONS.START_EXECUTING),
  withLatestFrom(state$),
  mergeMap(([action, state]) => Object.keys(safeGet(getNetwork(state, action.networkId), 'devices'))
                                .map(deviceId => startExecuting(action.networkId, deviceId))
  ))

export const stopExecutingNetworkEpic = (action$, state$) => action$.pipe(
  ofType(NETWORK_ACTIONS.STOP_EXECUTING),
  withLatestFrom(state$),
  mergeMap(([action, state]) => Object.keys(safeGet(getNetwork(state, action.networkId), 'devices'))
                                .map(deviceId => stopExecuting(action.networkId, deviceId))
))

export const stepNetworkEpic = (action$, state$) => action$.pipe(
  ofType(NETWORK_ACTIONS.STEP_NETWORK),
  withLatestFrom(from(fetchWasmExecuteLine())),
  withLatestFrom(state$),
  mergeMap(([[action, wasmExecuteLine], state]) => {
    const {networkId} = action
    const devices = Object.values(safeGet(getNetwork(state, networkId), 'devices'))
    let newDataFields = getDataFields(state, networkId)
    const actions = []
    devices.forEach(device => {
      let newDevice;
      [newDevice, newDataFields] = stepDevice(device, wasmExecuteLine, newDataFields)
      actions.push(setDevice(networkId, newDevice))
    })

    actions.push(setDataFields(networkId, newDataFields))
    return actions
  })
)

export const traceExecutionEpic = (action$, state$) => action$.pipe(
  ofType(DEVICE_ACTIONS.START_EXECUTING, DEVICE_ACTIONS.STOP_EXECUTING, DEVICE_ACTIONS.STEP_DEVICE),
  withLatestFrom(state$),
  scan((executionTrace, [action, state]) => {
    switch(action.type) {
      case(DEVICE_ACTIONS.START_EXECUTING):
        executionTrace = performance.trace("executionTrace")

        var yolol = safeGet(getCode(state, action.networkId, action.deviceId), 'yolol')
        if(!yolol) {
          return 
        }
        var i = yolol.length,
            numChars = 0

        while(i--) {
          if(yolol.charAt(i) !== '\n') {
            numChars++
          }
        }
        executionTrace.putMetric("charsOfCode", numChars)
        executionTrace.putMetric('steps', 0)
        executionTrace.start()
        return executionTrace
      case(DEVICE_ACTIONS.STEP_DEVICE):
        if(!executionTrace) {
          return
        }
        executionTrace.incrementMetric('steps', 1)
        return executionTrace
      case(DEVICE_ACTIONS.STOP_EXECUTING):
        if(!executionTrace) {
          return
        }
        executionTrace.stop()
        return executionTrace
      default:
        return null
    }}, null),
  ignoreElements()
)

export default combineEpics(stepDeviceEpic,
  traceExecutionEpic, 
  startExecutingNetworkEpic, 
  stopExecutingNetworkEpic, 
  stepNetworkEpic)
