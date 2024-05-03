import { useEffect, useState } from "react";
import { initDatabase } from "../../config/firebaseConfig";
import { collection, getDocs, deleteDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  let redireccion = useNavigate()

  async function consultarUsuarios() {
    let colectionUsuarios = collection(initDatabase, "usuarios");
    let resultado = await getDocs(colectionUsuarios);
    let infoUsuarios = resultado.docs
    setUsers(infoUsuarios.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log(infoUsuarios.map((doc) => ({ ...doc.data() })));
  }
  useEffect(() => {
    consultarUsuarios()
  }, [])
  function buscarUsuario() {
    let userExist = users.some((item) => item.user === user)
    return userExist
  }
  function iniciarSesion(e) {
    e.preventDefault()
    if (buscarUsuario()) {
      Swal.fire({
        title: "Bievenido!",
        text: "Será redireccionado al Home!",
        icon: "success"
      });
      redireccion('/home')
    } else {
      Swal.fire({
        title: "Error",
        text: "Usuario y/o contraseña incorrecto o no existe",
        icon: "error"
      });
    }
  }
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUser(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input onClick={iniciarSesion} type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
