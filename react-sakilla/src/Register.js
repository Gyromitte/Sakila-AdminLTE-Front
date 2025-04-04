import React from "react";


function Register () {
    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="login-form">
                <form>
                    <div className="w-100">
                        <label htmlFor="inputName">Nombre:</label>
                        <input type="text" className="form-control" id="inputName"></input>

                        <label htmlFor="inputLastName" className="mt-3">Apellidos:</label>
                        <input type="text" className="form-control" id="inputLastName"></input>
                        
                        <label htmlFor="inputEmail" className=" mt-3">Correo Electronico:</label>
                        <input type="email" className="form-control" id="inputEmail"></input>
                        
                        <label htmlFor="inputPassword" className=" mt-3">Contraseña:</label>
                        <input type="password" className="form-control" id="inputPassword"></input>
                        
                        <div className="mt-3 text-center w-80">
                            <button className="btn btn-dark w-100">Registrar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;