import React, { useState } from 'react'

import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import firebase from '../../../config/firebase'

import Authenticated from '../../../components/authenticated'
import Navbar from '../../../components/navbar'


function MeterRegister(){

  const [loading,setLoading] = useState(false)
  const [height,setHeight] = useState('')
  const [weight,setWeight] = useState('')
  const [bodyfat,setBodyfat] = useState('')
  const [date] = useState(new Date())
  const [error, setError] = useState()
  const history = useHistory()

  const email = useSelector(state => state.email)

  const firestore = firebase.firestore()

  const onFinish = () => {
    if(!height){
      setError('Altura é obrigatória')
      return
    }
    if(!weight){
      setError('Peso é obrigatório')
      return
    }
    setLoading(true)
    firestore.collection('meters').add({
      height,
      weight,
      bodyfat,
      email,
      date,
      dateString: date.toString()
    }).then(() => {
      setLoading(false)
      history.push('/meters')
    })
    .catch(() => {
      setLoading(false)
      setError('Algo deu errado, tente novamente mais tarde!')
    })
  }

  return (
    <>
      <Authenticated />
      <Navbar />
      <div className="container">
          <form className="form-signin form-signin-max mx-auto text-center my-5">
            <div className="text-center mb-4">
              <h1 className="h3 mb-3 mt-3 font-weight-normal">Medidas</h1>
            </div>

            <div className="form-label-group mt-4">
              <input type="number" id="inputEmail" className="form-control" placeholder="Altura" onChange={e => setHeight(e.target.value)}/>
            </div>

            <div className="form-label-group mt-2">
              <input type="number" id="inputPassword" className="form-control" placeholder="Peso" onChange={e => setWeight(e.target.value)}/>
            </div>
            <div className="form-label-group mt-2">
              <input type="number" id="inputConfirmPassword" className="form-control" placeholder="Percentual de gordura (Opcional)" onChange={e => setBodyfat(e.target.value)}/>
            </div>

            {
              loading ? 
                <div className="spinner-border text-secondary my-3" role="status"><span className="sr-only">Loading...</span></div>
                :
                <button className="btn btn-lg btn-primary btn-block btn-singin my-3" type="button" onClick={() => onFinish()}>Salvar</button>
            }

            {
              error &&
              <div className="my-3 text-center error-text">
                <span><b>Ops!</b> {error}</span>
              </div>
            }
           
            </form>
            
      </div>
    </>
  )
}

export default MeterRegister