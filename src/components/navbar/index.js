import React from 'react'
import {Link} from 'react-router-dom'

import { useDispatch } from 'react-redux'

import './navbar.css'

function Navbar(){
  const dispatch = useDispatch()
  
  const logout = () => {
    dispatch({type: 'LOGOUT'})
  }

  return (
    <nav className="navbar navbar-expand-lg">
      <Link to="/" className="navbar-brand text-white"><i className="fas fa-apple-alt fa-2x"></i></Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <i className="fas fa-bars text-white"></i>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active"><Link to="/meters" className="nav-link">Medidas<span className="sr-only">(current)</span></Link></li>
          <li className="nav-item active"><Link to="/foods"className="nav-link">Alimentos<span className="sr-only">(current)</span></Link></li>
          <li className="nav-item active"><Link to="/diary" className="nav-link">Diário<span className="sr-only">(current)</span></Link></li>
          <li className="nav-item active"><Link to="/" onClick={() => logout()} className="nav-link">Sair<span className="sr-only">(current)</span></Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar