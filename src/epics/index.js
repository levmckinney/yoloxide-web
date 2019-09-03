import {DEVICE_ACTIONS, setDevice, NETWORK_ACTIONS, resetFields, removeField, DATA_FIELD_ACTIONS, assignFieldToDevice, addField, setField} from '../actions'
import {withLatestFrom, scan, ignoreElements, mergeMap, map} from 'rxjs/operators'
import {from} from 'rxjs'
import stepDevice, { fetchWasmExecuteLine } from '../yolol/executionEngine';
import { ofType, combineEpics } from 'redux-observable';
import { getDevice, getDataFieldsOnNetwork, safeGet, getNetwork, getCode, getDevicesOnNetworks } from '../getters';
import {performance} from '../'

export const stepDeviceEpic = (action$, state$) => action$.pipe(
  ofType(DEVICE_ACTIONS.STEP_DEVICE),
  withLatestFrom(from(fetchWasmExecuteLine())),
  withLatestFrom(state$),
  mergeMap(([[action, wasmExecuteLine], state]) => {
    const device = getDevice(state, action.deviceId),
          dataFields = getDataFieldsOnNetwork(state, action.networkId)
    const [newDevice, newDataFields] = stepDevice(device,
                                 wasmExecuteLine,
                                 dataFields)
    return [setDevice(action.networkId, newDevice), ...Object.values(newDataFields).map(field => setField(field))]
  })
)

export const stepNetworkEpic = (action$, state$) => action$.pipe(
  ofType(NETWORK_ACTIONS.STEP_NETWORK),
  withLatestFrom(from(fetchWasmExecuteLine())),
  withLatestFrom(state$),
  mergeMap(([[action, wasmExecuteLine], state]) => {
    const {networkId} = action
    const devices = getDevicesOnNetworks(state, networkId)
    let newDataFields = getDataFieldsOnNetwork(state, networkId)
    const actions = []
    devices.forEach(device => {
      let newDevice;
      console.log("Begins device step", {device, wasmExecuteLine, newDataFields});
      [newDevice, newDataFields] = stepDevice(device, wasmExecuteLine, newDataFields)
      console.log("Stepping device", {newDataFields, newDevice})
      actions.push(setDevice(networkId, newDevice))
    })

    actions.push(...Object.values(newDataFields).map(field => setField(field)))
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

        var yolol = safeGet(getCode(state, action.deviceId), 'yolol')
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
        return null
      default:
        return null
    }}, null),
  ignoreElements()
)

export const resetDataFieldsOnExecStartOrStop = ($action, $state) => $action.pipe(
  ofType(DEVICE_ACTIONS.START_EXECUTING, DEVICE_ACTIONS.STOP_EXECUTING,
     NETWORK_ACTIONS.STOP_EXECUTING, NETWORK_ACTIONS.START_EXECUTING),
  withLatestFrom($state),
  map(([action, state]) => resetFields(getNetwork(state, action.networkId).dataFields))
)

export const removeUnusedDataFields = ($action, $state) => $action.pipe(
  ofType(DEVICE_ACTIONS.UNASSIGN_DATA_FIELD, DEVICE_ACTIONS.REMOVE_DEVICE),
  withLatestFrom($state),
  mergeMap(([, {dataFields, dataFieldDevice}]) => 
    Object.values(dataFields)
      .filter(dataField => !dataFieldDevice.some(value => value.dataFieldId === dataField.id))
      .map(({id}) => id)
  ),
  map(([action]) => removeField(action.dataFieldId))
)

//TODO optise this so it is not always calling add field.
export const assignAddAndOrSetDataFieldEpic = ($action, $state) => $action.pipe(
  ofType(DATA_FIELD_ACTIONS.ASSIGN_ADD_AND_OR_SET),
  withLatestFrom($state),
  mergeMap(([action,]) => [
      addField(action.networkId, action.dataField),
      assignFieldToDevice(action.deviceId, action.dataField.id, action.mixCaseName)
    ]
  )
)

export default combineEpics(
  stepDeviceEpic,
  traceExecutionEpic, 
  stepNetworkEpic,
  assignAddAndOrSetDataFieldEpic,
  resetDataFieldsOnExecStartOrStop,
  removeUnusedDataFields
)
