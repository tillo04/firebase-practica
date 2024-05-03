import { useEffect, useState } from "react";
import { initDatabase } from "../../config/firebaseConfig";
import { collection, getDocs, deleteDoc, addDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import './Login.css'

const Registro = () => {
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
    async function crearUsuario() {
        let nuevoUsuario = collection(initDatabase, 'usuarios')
        let usuario = {
            user, password, email
        }
        await addDoc(nuevoUsuario, usuario)
    }
    function registrarUsuario(e) {
        e.preventDefault()
        if (buscarUsuario()) {
            Swal.fire({
                title: "Error!",
                text: "Usuario ya existe en la base de datos!",
                icon: "error"
            });
        } else {
            crearUsuario()
            Swal.fire({
                title: "Correcto",
                text: "Usuarios registrado correctamente",
                icon: "success"
            });
            redireccion('/')
        }
    }
    return (
        <div className="login-container">
            <h2>Registro</h2>
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
                <input onClick={registrarUsuario} type="submit" value="Registro" />
            </form>
        </div>
    );
};

export default Registro;
