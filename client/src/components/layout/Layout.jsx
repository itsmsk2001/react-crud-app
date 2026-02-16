import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid px-4">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/">Users CRUD</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container">
                {children}
            </div>
        </div>
    );
};

export default Layout;
