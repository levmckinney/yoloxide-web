import {DEVICE_ACTIONS, setDevice} from '../actions'
import {withLatestFrom, map} from 'rxjs/operators'
import {from} from 'rxjs'
import stepDevice, { fetchWasmExecuteLine } from '../yolol/executionEngine';
import { ofType, combineEpics } from 'redux-observable';
import { getDevice, getDataFields } from '../getters';

export const stepDeviceEpic = (action$, state$) => action$.pipe(
  ofType(DEVICE_ACTIONS.STEP_DEVICE),
  withLatestFrom(from(fetchWasmExecuteLine())),
  withLatestFrom(state$),
  map(([[action, wasmExecuteLine], state]) => {
    const device = getDevice(state, action.networkId, action.deviceId),
          dataFields = getDataFields(state, action.networkId)
    console.log('step Device Epic executing', {action, wasmExecuteLine, device, dataFields})
    const newDevice = stepDevice(device,
                                 wasmExecuteLine,
                                 dataFields)
    return setDevice(action.networkId, newDevice)
  })
)

export default combineEpics(stepDeviceEpic)
