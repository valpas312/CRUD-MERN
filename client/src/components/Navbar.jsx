import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (<>
    <nav>
        <ul>
            <li><Link to="/">Lista de Usuarios</Link></li>
            <li><Link to="/agregar">Agregar Usuario</Link></li>
        </ul>
    </nav>
  </>
  )
}

export default Navbar