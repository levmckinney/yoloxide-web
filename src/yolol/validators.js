export const fieldNameRegex = /^[a-z_1-9]*$/

export const numberRegex=/(^([0-9]{1,14}(\.[0-9]{1,4})?)$)/

export const validNumber = (number) => {
  return typeof number === 'string' && numberRegex.test(number)
}

export const validFieldName = (fieldName) => {
  return typeof fieldName === 'string' && fieldNameRegex.test(fieldName )
}

