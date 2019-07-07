import React from 'react'
import  DeviceNetwork from '../../containers/devices/DeviceNetwork'

const Networks = ({networkIds}) => {
  return (
    <React.Fragment>
      {networkIds.map(id => <DeviceNetwork key={id} networkId={id}/>)}
    </React.Fragment>
  )
}

export default Networks;