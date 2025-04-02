import React from "react";
import NavBar from "./admin/navbar";

function Login() {
    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="login-form">
                <form>
                    <div className="w-100">
                        <label htmlFor="inputEmail" className="form-label">Correo electronico:</label>
                        <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp"></input>
                        <div id="emailHelp" className="form-text ">No compartas tu email con nadie.</div>
                        <label htmlFor="inputPassword" className="form-label mt-3" id="inputPassword" aria-describedby="passwordHelp">Contraseña:</label>
                        <input type="password" className="form-control"></input>
                        <div className="mt-3 text-center w-80">
                            <button type="submit" className="btn btn-dark w-100">Iniciar sesión</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;