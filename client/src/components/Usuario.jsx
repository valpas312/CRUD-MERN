import React from 'react'
import './Usuario.css'

const Usuario = ({name, email, password, idusuario}) => {
  return (
    <div className='userContainer'>
      <h1>{idusuario}</h1>
      <h2>{name}</h2>
      <p>{email}</p>
      <p>{password}</p>
    </div>
  )
}

export default Usuario