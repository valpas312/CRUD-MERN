import React from "react";
import "./Usuario.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

//destructuring de props

const Usuario = ({ name, email, password, idusuario }) => {

  const navigate = useNavigate();

  const eliminarUsuario = () => {
    axios
      .post("http://localhost:3000/api/usuario/eliminar", {
        idusuario: idusuario,
      })
      .then((res) => {
        console.log(res);
        alert("Usuario eliminado");
        navigate(0);
      })
      .catch((err) => {
        console.log(err);
        alert("Error al eliminar usuario");
      });
  };
  return (
    <div className="userContainer">
      <h1>{idusuario}</h1>
      <h2>{name}</h2>
      <p>{email}</p>
      <p>{password}</p>
      <Link to={`/editarusuario/${idusuario}`}>
        <button>Editar</button>
      </Link>
        <button onClick={eliminarUsuario}>Eliminar</button>
    </div>
  );
};

export default Usuario;
