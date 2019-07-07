export const callInnerReducer = (reducer, actionKey, stateKey, actionTypes) => {
  let actions = {}
  Object.values(actionTypes).forEach((actionType) => {
    Object.assign(actions, {[actionType]:(state, action) => {
      let id = action[actionKey]
      let elementToAlter = state[id]
      let alteredElement = {...elementToAlter, [stateKey]: reducer(elementToAlter[stateKey], action)}
      return {...state, [id]:alteredElement}
    }})
  })
  return actions
}