import {DEVICE_ACTIONS, setDevice, setDataFields , CODE_ACTIONS, NETWORK_ACTIONS, startExecuting, stopExecuting} from '../actions'
import {withLatestFrom, scan, ignoreElements, throttleTime, mergeMap} from 'rxjs/operators'
import {from} from 'rxjs'
import stepDevice, { fetchWasmExecuteLine } from '../yolol/executionEngine';
import { ofType, combineEpics } from 'redux-observable';
import { getDevice, getDataFields, safeGet, getNetwork } from '../getters';
import {trace} from '../'

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
  ofType(NETWORK_ACTIONS.STOP_EXECUTING),
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

export const numberOfCharsPerformanceTrace = (action$, state$) => action$.pipe(
  ofType(CODE_ACTIONS.SET_CODE),
  throttleTime(10000),
  withLatestFrom(state$),
  scan((maxNumberOfChars, [, state]) => {
    let allYolol = ""

    Object.values(state.networks)
    .map(network => Object.values(safeGet(network, 'devices')))
    .map(device => safeGet(device, ['code', 'yolol']))
    .map(yolol => {allYolol += yolol || ""; return yolol})

      let i = allYolol.length,
          numChars = 0
    while(i--) {
      if(allYolol.charAt(i) !== '\n') {
        numChars++
      }
    }
    if(numChars > maxNumberOfChars) {
      maxNumberOfChars = numChars
      trace.incrementMetric('maxCharsInCode', maxNumberOfChars);
    }
    return maxNumberOfChars
  }, 0),
  ignoreElements()
)

export default combineEpics(stepDeviceEpic,
  numberOfCharsPerformanceTrace, 
  startExecutingNetworkEpic, 
  stopExecutingNetworkEpic, 
  stepNetworkEpic)
