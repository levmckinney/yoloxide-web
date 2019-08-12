export function normalizeLineNumber(str, numberOfLines=20){
  let newLinesSeen = 0
  if(typeof str !== 'string'){
    return str
  }
  for(let i = 0; i < str.length; i++) {
    if (str.charAt(i) === '\n') {
      newLinesSeen++;
    }
  }
  if(newLinesSeen < numberOfLines) {
    for(let i = 0; i < numberOfLines - newLinesSeen - 1; i++) {
      str += '\n'
    }
  } else if(newLinesSeen > numberOfLines) {
    newLinesSeen = 0
    for(let i = 0; i < str.length; i++) {
      if (str.charAt(i) === '\n') {
        newLinesSeen++;
        if(newLinesSeen === numberOfLines) {
          str = str.slice(0, i)
        }
      }
    }
  }
  return str
}