import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Redirect } from 'react-router-dom'

import firebase from '../../config/firebase'

import './sign-up.css'

function SignUp(){

  const [email,setEmail] = useState()
  const [password,setPassword] = useState()
  const [confirmPassword,setConfirmPassword] = useState()
  const [error,setError] = useState(false)
  const [msgError,setMsgError] = useState()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const onFinish = () => {
    
    if(!email || !password || !confirmPassword){
      setError(true)
      setMsgError('Preencha todos os campos para prosseguir!')
      return
    }
    if(password !== confirmPassword){
      setError(true)
      setMsgError('A senha não confere!')
      return
    }
    if(password.length < 6){
      setError(true)
      setMsgError('A senha deve ter 6 ou mais caracteres!')
      return
    }
    setLoading(true)

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(response => {
        
        setError(false)
        setLoading(false)
        
        dispatch({type:'LOGIN', email:email})
      })
      .catch(error => {
        setLoading(false)
        if(error.code === 'auth/email-already-in-use'){
          setError(true)
          setMsgError('Email já cadastrado, tente recuperar sua senha!')
        }
        if(error.code === 'auth/invalid-email'){
          setError(true)
          setMsgError('Email inválido!')
        }        
      })
  }

  return (
    <>
      { useSelector(state => state.logged) && <Redirect to='/profile'/>}
      <div className="d-flex align-items-center justify-content-center sign-in-content">
        <div className="modal-signup col-4 rounded">
          <form className="form-signin form-signin-max mx-auto text-center">
            <div className="text-center mb-4">
              <h1 className="h3 mb-3 mt-3 font-weight-normal">Dieta Flex</h1>
            </div>

            <div className="form-label-group mt-4">
              <input type="email" id="inputEmail" className="form-control" placeholder="Email"  onChange={e => setEmail(e.target.value)}/>
            </div>

            <div className="form-label-group mt-2">
              <input type="password" id="inputPassword" className="form-control" placeholder="Senha" onChange={e => setPassword(e.target.value)}/>
            </div>
            <div className="form-label-group mt-2">
              <input type="password" id="inputConfirmPassword" className="form-control" placeholder="Confirmação de senha" onChange={e => setConfirmPassword(e.target.value)}/>
            </div>

            {
              loading ? 
                <div className="spinner-border text-secondary my-3" role="status"><span className="sr-only">Loading...</span></div>
                :
                <button className="btn btn-lg btn-primary btn-block btn-singin my-3" type="button" onClick={() => onFinish()}>Cadastrar</button>
            }
           
            </form>

            {
              error &&
              <div className="my-3 text-center error-text">
                <span><b>Ops!</b> {msgError}</span>
              </div>
            }
            
        </div>
      </div>
    </>
    
    
  )
}

export default SignUp