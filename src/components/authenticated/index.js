import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

function Authenticated(){
  return (
    <>
      {useSelector(state => state.logged) ? 
        <></>
        :
        <Redirect to='/' />
      }
    </>
  )
}

export default Authenticated