import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListaUsuarios from "./components/ListaUsuarios";
import AgregarUsuario from "./components/AgregarUsuario";
import EditarUsuario from "./components/EditarUsuario";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <h1>MERN CRUD APP</h1>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<ListaUsuarios />} />
          <Route path="/agregar" element={<AgregarUsuario />} />
          <Route path="/editarusuario/:id" element={<EditarUsuario />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
