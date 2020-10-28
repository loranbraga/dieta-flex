import React, { useEffect, useState } from 'react'

import Navbar from '../../components/navbar'
import Authenticated from '../../components/authenticated'

import firebase from '../../config/firebase'
import moment from 'moment'

import { useSelector } from 'react-redux'


function Home(){

  const firestore = firebase.firestore()
  const email = useSelector(state => state.email)
  
  const [meter,setMeter] = useState()
  const [date,setDate] = useState()

  useEffect(() => {
    firestore.collection('meters').where('email','==', email).orderBy('date','desc').get()
      .then(response => {
        const objs = response.docs.map(item => ({
          id: item.id,
          ...item.data()
        }))
        setMeter(objs[0])
        setDate(new Date(objs[0].dateString))
      })
  },[])

  return (
    <>
      <Authenticated />
      <Navbar />
      <div className="container">
        <div className="mt-5">
          <h1 className="h2 mb-3 font-weight-normal"><b>Olá Sr. Maromba</b></h1>
          { meter ? 
            <p>Seu peso atual é de <b>{meter.weight} kilos</b> e sua altura é de <b>{meter.height} metros</b> com percentual de gordura de <b>{meter.bodyfat? meter.bodyfat : 20}%</b>. Medição cadastra em {moment(date).format("DD/MM/YYYY")}*</p>
            :
            <p>Não há medições cadastradas. </p>
          }
          
        </div>
      </div>
    </>
  )
}

export default Home