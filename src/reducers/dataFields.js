import { createReducer } from "redux-starter-kit";
import {DATA_FIELD_ACTIONS} from '../actions';
import { validNumber } from '../yolol/validators'


// Helpers
export const validField = (field) => {
  if(!field || !field.value || !field.type || !field.startValue){
    console.log("!field || !field.value || !field.type || !field.startValue")
    return false
  }
  if(field.type !== 'number' && field.type !== 'string') {
    console.log("field.type !== 'number' && field.type !== 'string'")
    return false
  }
  if(field.type === 'number' && (!validNumber(field.value))) {
    console.log("field.type === 'number' && (!validNumber(field.value)")
    return false
  }
  return true
}

export const resetField = (field) => {
  field.value = field.startValue
  field.type = field.startType
}

/**
 * Example structure
 * {
 *   thenameofthefield: {
 *    id: thenameofthefield,
 *    value:" ", // The current value of the item
 *    type: string, // the type can be either number or string
 *    startValue: 12, // the value the dataField resets to when not executing
 *    startType: "number", // the type the data field resets to when not executing
 *  }
 *  // ect...
 * }
 */
const dataFields = createReducer({},{
  [DATA_FIELD_ACTIONS.ADD_FIELD]: (fields, {dataField}) => {
    let defaultField = {value:"0", type:"number", startValue:"0", startType:'number'}
    dataField = {startValue:dataField.value, startType:dataField.type, ...dataField}
    let field = {...defaultField, ...dataField}
    if(!validField(field)) {
      console.error('Attempted to enter invalid field into state')
      return
    }
    fields[field.id] = field
  },
  [DATA_FIELD_ACTIONS.SET_FIELD_VALUE]: (fields, action) => {
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
  [DATA_FIELD_ACTIONS.RESET]: (fields, action) => {
    action.dataFieldIds.map(dataFieldId => fields[dataFieldId]).forEach(resetField)
  }
})


export default dataFields