import React from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css'

const SideBar = () => {
    return (
        <header className="sidebar">
            <h2>Panel de Control</h2>
            <ul className='opciones'>
                <li className='animated-btn'><Link to="/home">Dashboard</Link></li>
                <li className='animated-btn'><Link to="/usuarios">Usuarios</Link></li>
                <li className='animated-btn'><Link to="/">Cerrar Sesión</Link></li>
            </ul>
        </header>
    );
};

export default SideBar;
