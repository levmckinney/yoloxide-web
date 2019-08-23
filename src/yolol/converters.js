export function getLine(string, number) {
  let lines = string.split('\n')
  lines = lines.map(line => line + '\n').filter((line, i, lines) => !(line === '' && i === lines.length - 1))
  let line = lines[number - 1];
  return line ? line : ""
}

export function createEngineEnv(device, dataFields) {
  const {name, code:{line, localContext={}}} = device

  let state = {
    name,
    next_line: line,
    error:"",
    version:"0.3.2",
    local_context: {...localContext},
    global_context: Object.values(dataFields).reduce((acc, {id, value, type}) => {
      acc[':' + id] = {}
      if(type === 'string') {
        acc[':' + id]['StringVal'] = value
      } else if(type === 'number') {
        acc[':' + id]['NumberVal'] = value
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
    const id = key.replace(/^:/, '')
    if(!exists || exists.includes(id)) {
      // need to get value inside of type wrapper
      if(data.StringVal !== undefined) {
         acc.push({name:id, id, value: data.StringVal, type:'string'})
      } else if(data.NumberVal !== undefined){
        acc.push({name:id, id, value: data.NumberVal, type:'number'})
      } else {
        throw new YololConversionError(`Invalid type in context for ${key}. The the interpreter has changed what strings it use to represent types! Contact the Devs!`)
      }
    } else {
      throw new YololConversionError(`Trying to set ${key} that dose not exist in context`)
    }
    return acc
  }, []);
}

export class YololConversionError extends Error {}