import { createReducer } from "redux-starter-kit";
import {DATA_FIELD_ACTIONS} from '../actions';
import { validNumber } from '../yolol/validators'

export const validField = (field) => {
  if(!field || !field.value || !field.type || !field.startValue){
    return false
  }
  if(field.type !== 'number' && field.type !== 'string') {
    return false
  }
  if(field.type === 'number' && (!validNumber(field.value) || !validNumber(field.startValue))) {
    return false
  }
  return true
}

const dataFields = createReducer({},{
  [DATA_FIELD_ACTIONS.ADD_FIELD]: (fields, {dataField}) => {
    let defaultField = {value:"0", type:"number", startValue:"0", startType:'number', refs:{}}
    dataField = {startValue:dataField.value, startType:dataField.type, ...dataField}
    let field = {...defaultField, ...dataField}
    if(!validField(field)) {
      console.error('Attempted to enter invalid field into state')
      return
    }
    fields[field.id] = field
  },
  [DATA_FIELD_ACTIONS.SET_FIELD]: (fields, action) => {
    let defaultField = fields[action.id]
    let field = {...defaultField, ...action.dataField}
    if(!validField(field)) {
      console.error('Attempted to enter invalid field into state')
      return
    }
    fields[field.id] = field
  },
  [DATA_FIELD_ACTIONS.REMOVE_FIELD]: (fields, action) => {
    delete fields[action.id]
  },
  [DATA_FIELD_ACTIONS.ASSIGN_ADD_AND_OR_SET]: (fields, action) => {
    let id = action.dataField.id
    const dataField = action.dataField
    let field;
    if(fields[id]) {
      // Set
      field = fields[id]
      fields[id] = {...field, ...action.dataField, refs: {
        ...field.refs,
        [action.deviceId]:{
          deviceId: action.deviceId,
          mixCaseName: action.mixCaseName
        }
      }
    }
    } else {
      // Create
      const defaultField = {value:"0", type:"number", startValue:"0", startType:'number'}
      const cleanedUpInputField = {startValue: dataField.value, startType:dataField.type, ...dataField}
      field = {...defaultField, ...cleanedUpInputField}
      field.refs = {
          ...field.refs,
          [action.deviceId]: {
            deviceId: action.deviceId,
            mixCaseName: action.mixCaseName
          }
      }
      if(!validField(field)) {
        console.error('Attempted to enter invalid field into state')
        return
      }
      fields[field.id] = field
    }
  },
  [DATA_FIELD_ACTIONS.UNASSIGN_AND_REMOVE_IF_NO_REFS]: (fields, action) => {
    const id = action.dataFieldId,
          deviceId = action.deviceId
    delete fields[id].refs[deviceId]
    if(Object.entries(fields[id].refs).length === 0) {
      delete fields[id]
    }
  }
})

export default dataFields