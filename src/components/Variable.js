import React, { Component } from 'react'

export default function DataField ({name, value}) {
  return (
    <React.Fragment>
        {name}{' : '}<span class="rounded bg-secondary text-dark" >{value}</span>
    </React.Fragment>
  )
}

