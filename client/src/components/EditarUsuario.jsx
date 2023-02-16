import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";

const EditarUsuario = () => {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const params = useParams();

  useEffect(() => {
    axios
      .post("http://localhost:3000/api/usuario/editar", {
        idusuario: params.id,
      })
      .then((res) => {
        console.log(res.data[0]);
        const { name, email, password } = res.data[0];
        setName(name);
        setEmail(email);
        setPassword(password);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
        idusuario: params.id,
      };
      console.log(usuario);
      //Envio de datos al servidor
      axios
        .post("http://localhost:3000/api/usuario/actualizar", usuario)
        .then((res) => {
          console.log(res);
          setSubmit(false);
          alert("Usuario actualizado");
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          setSubmit(false);
          alert("Error al actualizar usuario");
        });
    },
  });
  return (
    <div>
      <h1>Editar Usuario</h1>
      <h2>Id usuario: {params.id}</h2>
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
            placeholder={name}
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
            placeholder={email}
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
            placeholder={password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
        </div>

        <button type="submit" disabled={submit}>
          {submit ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </div>
  );
};

export default EditarUsuario;
