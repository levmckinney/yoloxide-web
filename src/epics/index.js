import {DEVICE_ACTIONS, setDevice, setDataFields , CODE_ACTIONS} from '../actions'
import {withLatestFrom, scan, ignoreElements, throttleTime, mergeMap} from 'rxjs/operators'
import {from} from 'rxjs'
import stepDevice, { fetchWasmExecuteLine } from '../yolol/executionEngine';
import { ofType, combineEpics } from 'redux-observable';
import { getDevice, getDataFields, safeGet } from '../getters';
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

export default combineEpics(stepDeviceEpic, numberOfCharsPerformanceTrace)
