export function getLine(string, number) {
  let lines = string.split('\n')
  lines = lines.map(line => line + '\n').filter((line, i, lines) => !(line === '' && i === lines.length - 1))
  let line = lines[number - 1];
  return line ? line : ""
}

export function deviceToEngineEnv(device) {
  const {name, code:{line, localContext={}}, dataFields} = device

  let state = {
    name,
    next_line: line,
    error:"",
    version:"0.3.1",
    local_context: {...localContext},
    global_context: Object.values(dataFields).reduce((acc, {name, value, type}) => {
      acc[':'+name] = {}
      if(type === 'string') {
        acc[':'+name]['StringVal'] = value
      } else if(type === 'number') {
        acc[':'+name]['NumberVal'] = value
      } else {
        throw Error("Invalided type of data field!")
      }
      return acc
    }, {})
  }

  return state
}

/**
 * Convert a context object to a list of variables similar to the ones stored in the store
 * @param {*} context the context object
 * @param {*} exists A list of allowed names
 */
export function contextToVariables(context, exists=undefined) {
  return Object.entries(context).reduce((acc, [key, data]) => {
    // its safe to assume that locale variables will not have this
    const name = key.replace(/^:/, '')
    if(!exists || exists.includes(name)) {
      // need to get value inside of type wrapper
      if(data.StringVal !== undefined) {
         acc.push({name, value: data.StringVal, type:'string'})
      } else if(data.NumberVal !== undefined){
        acc.push({name, value: data.NumberVal, type:'number'})
      } else {
        throw Error("Invalid type in context")
      }
    } else {
      console.error("Trying to set something that dose not exist")
    }
    return acc
  }, []);
}