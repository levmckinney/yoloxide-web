import React from 'react'
import Form from 'react-bootstrap/Form'

export default function ErrorLog({errors}) {
  let errorString = ""
  if(errors) {
    errorString = errors.reduce((acc, cur) => acc + '\n' + cur, "")
  }
  return (
    <Form.Control as="textarea" rows="6" value={errorString} readOnly/>
  )
}
