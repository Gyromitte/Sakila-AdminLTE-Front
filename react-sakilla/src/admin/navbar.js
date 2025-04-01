import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const NavBar = () => {
    return (
        <div className = "wrapper">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" href="#" role="button">
                    <i className="fas fa-bars"></i>
                    </a>
                </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <div className="navbar-search-block">
                    <form className="form-inline">
                        <div className="input-group input-group-sm">
                        <div className="input-group-append">
                            <button class="btn btn-navbar" type="submit">
                            <i className="fas fa-search"></i>
                            </button>
                            <button className="btn btn-navbar" type="button" data-widget="navbar-search">
                            <i className="fas fa-times"></i>
                            </button>
                        </div>
                        </div>
                    </form>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                    <i className="fas fa-expand-arrows-alt"></i>
                    </a>
                </li>
                </ul>
            </nav>

        </div>
    );
}

export default NavBar;