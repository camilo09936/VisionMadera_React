import { useState, useEffect } from "react";
import '../styles/Login.css';
import LogoVM from '../assets/ResourcesLogin/LogoVisionMadera.png'
import VerIcono from '../assets/ResourcesLogin/MostrarContrasena.png'
import OcultarIcono from '../assets/ResourcesLogin/OcultarContrasena.png'

const Login= ({alCambiarRegistro}) => { //Capturar Datos
    const [usuarios, setUsuarios] = useState([]);
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [verContrasena, setVerContrasena] = useState(false);
    const [recordarme, setRecordarme] = useState(false);
    const [error, setError] =  useState("");

    useEffect(() => { //Cargar al iniciar
        obtenerUsuarios();
        const correoGuardado= localStorage.getItem("correoUsuario");
        if (correoGuardado){
            setCorreo(correoGuardado);
            setRecordarme(true);
        }
    }, []);

        function obtenerUsuarios(){ //Funcion obtener usuarios
            fetch("http://localhost:3001/usuarios")
            .then((response) => response.json())
            .then((data) => setUsuarios(data))
            .catch((error) => console.error("Error:", error));
        }

        const validarEmail= (email) =>{
            return /\S+@\S+\.\S+/.test(email); //Regex Validacion Correo
        };
        
        function acceder(e){ //Funcion para validar el acceso
            e.preventDefault();
            setError("");

            if(!correo || !contrasena){
                setError("Por favor, completa todos los campos.");
                return;
            }

            if(!validarEmail(correo)){
                setError("El formato del correo no es válido.");
                return;
            }

            const usuarioEncontrado = usuarios.find(
                (u) => u.correo.toLowerCase() === correo.toLowerCase() && u.contrasena === contrasena
            );
            
            if (usuarioEncontrado) {
                if(recordarme){
                    localStorage.setItem("correoUsuario", correo);
                }else{
                    localStorage.removeItem("correoUsuario");
                }
                alert("¡Bienvenido " + (usuarioEncontrado.nombre || usuarioEncontrado.name)+ "!");
            }else{
                setError("Correo o contraseña incorrectos");
            }
        }
        return (
            <div className="pantalla-login">
                <div className="tarjeta-login">
                    <img src={LogoVM} alt="Logo VisionMadera" className="logo-imagen"/>
                    <form onSubmit={acceder} noValidate>
                        <h2>Login</h2>
                        {error && <p className="mensaje-error">{error}</p>}
                        <div className="campo-entrada">
                            <input
                            type="text"
                            required
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            />
                            <label>Ingrese su correo</label>
                        </div>
                        <div className="campo-entrada">
                            <input
                            type={verContrasena ? "text" : "password"}
                            required
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                        />
                        <label>Ingrese su contraseña</label>
                        <img
                        src={verContrasena ? OcultarIcono : VerIcono}
                        alt="Ver/Ocultar"
                        className="icono-ojo"
                        onClick={()=> setVerContrasena(!verContrasena)}
                        />
                        </div>
                        <div className="opciones-extra">
                            <label style={{display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer'}}>
                                <input 
                                type="checkbox"
                                checked={recordarme}
                                onChange={(e)=> setRecordarme(e.target.checked)}
                                />
                                Recordarme
                                </label>
                                <a href="#">¿Olvidaste tu contraseña?</a>
                        </div>
                        <button type="submit">Ingresar</button>
                        <div className="registro">
                            <p>¿No tienes cuenta? 
                                <span 
                                className="link-falso"
                                onClick={alCambiarRegistro}
                                >
                                    Regístrate
                                    </span>
                                </p>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
    export default Login;