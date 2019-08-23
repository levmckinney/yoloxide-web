import React from 'react'
import Button from 'react-bootstrap/Button'

export default function RemoveButton({remove, size}={size:'sm'}) {
  return (
    <Button variant="outline-danger" size={size} onClick={()=>remove()}>Remove</Button>
  )
}
