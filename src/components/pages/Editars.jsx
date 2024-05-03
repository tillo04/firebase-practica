import { useEffect, useState } from "react";
import { initDatabase } from "../../config/firebaseConfig";
import { collection, getDoc, deleteDoc, addDoc, doc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import '../auth/Login.css'

const Editars = () => {
    const [email, setEmail] = useState("");
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);
    let redireccion = useNavigate();
    let { id } = useParams();

    async function consultarUsuario(id) {
        let userUpdate = await getDoc(doc(initDatabase, "usuarios", id))
        setEmail(userUpdate.data().email);
        setUser(userUpdate.data().user);
        setPassword(userUpdate.data().password);
    }

    useEffect(() => {
        consultarUsuario(id)
    }, [])

    async function editarUsuario(id) {
        let nuevoUsuario = doc(initDatabase, 'usuarios', id)
        let usuario = {
            user, password, email
        }
        await updateDoc(nuevoUsuario, usuario)
        redireccion('/home')
    }
    const confirmarAccion = (id) => {
        Swal.fire({
            title: "Esta seguro de editar este usuario?",
            text: "esta accion no se puede revertir",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "si"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "editado",
                    text: "el usuario ha sido editado",
                    icon: "success"
                });
                editarUsuario(id);
            }
        });
    };
    return (
        <div className="login-container">
            <h2>Registro</h2>
            <form>
                <input
                    type="text"
                    placeholder="username"
                    onChange={(e) => setUser(e.target.value)}
                    required
                    value={user}
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    value={password}
                />
                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    value={email}
                />
                <input onClick={() => confirmarAccion(id)} type="button" value="editar" />
            </form>
        </div>
    );
};

export default Editars;
