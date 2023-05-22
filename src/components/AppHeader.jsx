import React from 'react';
import { Link } from 'react-router-dom';

function AppHeader() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Consumo APIs públicas</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-link" to="/farmacias">
                            Farmacias
                        </Link>
                        <Link className="nav-link" to="/farmacia-turno">
                            Farmacia de Turno
                        </Link>
                        <Link className="nav-link" to="/mercadopublico">
                            Mercado Público
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default AppHeader;
