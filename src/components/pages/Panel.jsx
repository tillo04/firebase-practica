import React, { useState } from 'react';
import { useEffect } from 'react';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { initDatabase } from '../../config/firebaseConfig';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const Panel = ({ title }) => {
  const [users, setUsers] = useState([])

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

  const eliminarUsuario = async (id) => {
    let userDelete = doc(initDatabase, "usuarios", id);
    await deleteDoc(userDelete);
    consultarUsuarios();
    console.log(userDelete);
  };

  const confirmarAccion = (id) => {
    Swal.fire({
      title: "Esta seguro de eliminar este usuario?",
      text: "esta accion no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "si"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "eliminado",
          text: "el usuario ha sido eliminado",
          icon: "success"
        });
        eliminarUsuario(id);
      }
    });
  };



  return (
    <main className="section">
      <h2>{title}</h2>
      {
        users.map((user) => (
          <section key={user.id}>
            <h3>user: {user.user} </h3>
            <h3>password: {user.password} </h3>
            <h3>email: {user.email} </h3>
            <div>
              <button type='button'><Link to={'/editar/'+user.id}> Editar</Link></button>
              <button type='button' onClick={() => confirmarAccion(user.id)}>eliminar</button>
            </div>
          </section>
        ))
      }
    </main >
  );
};

export default Panel;
