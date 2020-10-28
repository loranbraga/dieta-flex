import React, { useState, useEffect } from 'react'

import firebase from '../../config/firebase'

import Authenticated from '../../components/authenticated'
import Navbar from '../../components/navbar'
import Table from '../../components/table'

import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'


function Foods(){

  const firestore = firebase.firestore()
  const email = useSelector(state => state.email)
  const columns = ['Data','Calorias']
  const history = useHistory()

  const [diary,setDiary] = useState([])

  useEffect(() => {
    firestore.collection('diary').where('email','==', email).get()
      .then(response => {
        const objs = response.docs.map(item => {
          const data = item.data()

          return {
            id: item.id,
            date: data.dateFormated,
            calories: data.calories,
            
          }
        })
        setDiary(objs)
      })
  }, [])

  return (
    <>
      <Authenticated />
      <Navbar />
      <div className="container">
        <div className="d-flex flex-row-reverse align-self-center mt-4">
          <div className="col-md-3 col-sm-12">
            <button className="btn btn-lg btn-primary btn-block btn-singin my-3" type="button" onClick={() => history.push('/diary/register')}>Inserir</button>
          </div>
          <div className="col-md-9 col-sm-12 my-auto">
          <h1 className="h2 mb-3 font-weight-normal">Diário</h1>
          </div>
        </div>
        <div className="mt-1">

          <Table columns={columns} data={diary}/>
        </div>
      </div>
      
    </>
  )
}

export default Foods