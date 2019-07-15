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
    let defaultField = {value:"0", type:"number", startValue:"0", startType:'number'}
    dataField = {startValue:dataField.value, startType:dataField.type, ...dataField}
    let field = {...defaultField, ...dataField}
    if(!validField(field)) {
      console.error('Attempted to enter invalid field into state')
      return
    }
    fields[field.name] = field
  },
  [DATA_FIELD_ACTIONS.SET_FIELD]: (fields, action) => {
    let defaultField = {value:"0", type:"number", startValue:"0"}
    let field = {...defaultField, ...action.dataField}
    if(!validField(field)) {
      console.error('Attempted to enter invalid field into state')
      return
    }
    fields[field.name] = field
  },
  [DATA_FIELD_ACTIONS.REMOVE_FIELD]: (fields, action) => {
    delete fields[action.name]
  }
})

export default dataFields