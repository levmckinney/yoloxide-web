import { createReducer } from "redux-starter-kit";
import {DATA_FIELD_ACTIONS} from '../actions';
import { validNumber } from '../yolol/validators'

export const validField = (field) => {
  if(!field || !field.value || !field.type || !field.startValue){
    console.log("something missing", field)
    return false
  }
  if(field.type !== 'number' && field.type !== 'string') {
    console.log("bad type")
    return false
  }
  if(field.type === 'number' && (!validNumber(field.value) || !validNumber(field.startValue))) {
    console.log("bad number")
    return false
  }
  return true
}

const dataFields = createReducer({},{
  [DATA_FIELD_ACTIONS.ADD_FIELD]: (fields, action) => {
    let defaultField = {value:"0", type:"number", startValue:"0"}
    let field = {...defaultField, ...action.dataField}
    console.log(action)
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