import React from 'react'
import PropTypes from 'prop-types'

export default function ShowIfTrue({bool, children, otherwise}) {
  otherwise = otherwise || React.Fragment
  if(bool) {
    return ({...children})
  } else {
    return otherwise
  }
}

ShowIfTrue.propTypes = {
  bool: PropTypes.bool.isRequired,
  otherwise: PropTypes.object
}