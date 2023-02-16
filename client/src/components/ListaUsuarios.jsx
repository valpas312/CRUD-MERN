import React, {useState, useEffect} from 'react'
import Usuario from './Usuario'
import axios from 'axios'

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/api/usuario/lista')
      .then(res => {
        console.log(res.data)
        setUsuarios(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  return (<>
    <div>ListaUsuarios</div>
    {
      usuarios.length ? usuarios.map(usuario => (
      <Usuario key={usuario._id} {...usuario} />
      )) : (<div>No hay usuarios</div>)
    }
  </>
  )
}

export default ListaUsuarios