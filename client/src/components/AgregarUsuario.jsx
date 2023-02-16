import React, { useState } from "react";
import axios from "axios";
import uniqid from "uniqid";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const AgregarUsuario = () => {

  const navigate = useNavigate();

  //Validacion de formularios con yup y manejo de estados de formulario con formik
  const [submit, setSubmit] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Debe tener 15 caracteres o menos")
        .required("Requerido"),
      email: Yup.string().email("Email no válido").required("Requerido"),
      password: Yup.string()
        .min(6, "Debe tener 6 caracteres o más")
        .required("Requerido"),
    }),
    onSubmit: (values) => {
      setSubmit(true);
      const usuario = {
        name: values.name,
        email: values.email,
        password: values.password,
        idusuario: uniqid()
      };
      console.log(usuario);
      //Envio de datos al servidor
      axios
        .post("http://localhost:3000/api/usuario/agregar", usuario)
        .then((res) => {
          console.log(res);
          setSubmit(false);
          alert("Usuario agregado");
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          setSubmit(false);
          alert("Error al agregar usuario");
        });
    },
  });
  return (
    <>
      <h1>Agregar Usuario</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div>{formik.errors.name}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
        </div>

        <button type="submit" disabled={submit}>
          {submit ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </>
  );
};

export default AgregarUsuario;
