import React from 'react'
import Button from 'react-bootstrap/Button'

export default function MakeScriptable({makeScriptable}) {
    return(<Button type="primary" size="lg" block onClick={()=>makeScriptable()}>Make Scriptable</Button>) 
}
