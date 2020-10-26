import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import firebase from '../../config/firebase'

import { useDispatch, useSelector } from 'react-redux'

import 'firebase/auth'

import './sign-in.css'

function SignIn(){

  const [email,setEmail] = useState()
  const [password,setPassword] = useState()
  // const [authenticed,setAuthenticed] = useState(false)
  const [error,setError] = useState()

  const dispatch = useDispatch()

  const auth = () => {
    if(!email || !password){
      setError('Preencha email e senha para prosseguir')
      return
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then( response => {
        console.log('response')
        dispatch({type:'LOGIN', email:email})
      }).catch(error => {
        setError('Email ou senha incorretos')
      })
  }

  return (
    <div className="d-flex align-items-center sign-in-content">
      { useSelector(state => state.logged) && <Redirect to='/sign-up'/>}
      <form className="form-signin form-signin-max mx-auto">
        <div className="text-center mb-4">
          <h1 className="h3 mb-3 font-weight-normal text-white">Dieta Flex</h1>
        </div>

        <div className="form-label-group mt-4">
          <input type="email" id="inputEmail" className="form-control" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        </div>

        <div className="form-label-group mt-2">
          <input type="password" id="inputPassword" className="form-control" placeholder="Senha" onChange={e => setPassword(e.target.value)} />
        </div>

        <button className="btn btn-lg btn-primary btn-block btn-singin mt-3" type="button" onClick={() => auth()}>Entrar</button>

        <div className="option-signin">
          <Link to="/sign-up" className='mx-2'>Quero me cadastrar</Link>
          <Link to="/" className='my-2'>Esqueci minha senha</Link>
        </div>
        {
          error &&
          <div className="mt-2 text-white text-center">
            <span><b>Ops! </b> {error}</span>
          </div>
        }
        
        <p className="mt-5 mb-3 text-muted text-center text-white">&copy; 2020</p>
      </form>
    </div>
  )
}

export default SignIn