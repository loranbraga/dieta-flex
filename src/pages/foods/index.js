import React, { useState, useEffect } from 'react'

import firebase from '../../config/firebase'

import Authenticated from '../../components/authenticated'
import Navbar from '../../components/navbar'
import Table from '../../components/table'

import { useHistory } from 'react-router-dom'


function Foods(){

  const firestore = firebase.firestore()
  const columns = ['Nome','Calorias']
  const history = useHistory()

  const [foods,setFoods] = useState([])

  useEffect(() => {
    firestore.collection('foods').orderBy('name').get()
      .then(response => {
        const objs = response.docs.map(item => {
          const data = item.data()

          return {
            id: item.id,
            name: data.name,
            calories: data.calories
          }
        })
        setFoods(objs)
      })
  },[])

  return (
    <>
      <Authenticated />
      <Navbar />
      <div className="container">
        <div className="d-flex flex-row-reverse align-self-center mt-4">
          <div className="col-md-3 col-sm-12">
            <button className="btn btn-lg btn-primary btn-block btn-singin my-3" type="button" onClick={() => history.push('/foods/register')}>Inserir</button>
          </div>
          <div className="col-md-9 col-sm-12 my-auto">
          <h1 className="h2 mb-3 font-weight-normal">Alimentos</h1>
          </div>
        </div>
        <div className="mt-1">

          <Table columns={columns} data={foods}/>
        </div>
      </div>
      
    </>
  )
}

export default Foods