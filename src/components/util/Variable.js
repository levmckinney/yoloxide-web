import React from 'react'
import PropTypes from 'prop-types'

export default function Variable ({name, value}) {
  return (
    <React.Fragment>
        {name}{' : '}<span className="rounded bg-secondary text-dark" >{value}</span>
    </React.Fragment>
  )
}

Variable.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
}