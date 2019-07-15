import { createReducer } from "redux-starter-kit";
import { CODE_ACTIONS } from '../actions'


const code = createReducer({}, {
  [CODE_ACTIONS.MAKE_SCRIPTABLE]: (code) => {
    return  code.codable ? code : {line:1, yolol:"", codable:true, localContext:{}}
  },
  [CODE_ACTIONS.SET_CODE]: (code, action) => {
    if(code.codable) {
      return {...code, ...action.code}
    }
  }
})


export default code;