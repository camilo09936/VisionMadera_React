import React, { useState, useEffect } from "react";
import '../styles/Registro.css';
import LogoVM from '../assets/ResourcesRegister/LogoVisionMadera.png';

const Registro = ({alCambiarLogin}) => {
    const [datos, setDatos] = useState({
        primerNombre: "", segundoNombre: "",
        primerApellido: "", segundoApellido: "",
        documento: "", fechaNacimiento: "",
        telefono: "", direccion: "",
        correo: "", contrasena: "", confirmarContrasena: ""
    });
    const [error, setError]= useState("");

    useEffect(()=>{ //Validar Contrasenas tiempo real
        if (datos.confirmarContrasena && datos.contrasena !== datos.confirmarContrasena){
            setError("Las contraseñas no coinciden");
        }else{
            setError("");
        }
    }, [datos.contrasena, datos.confirmarContrasena]);
    
    const manejarCambio=(e) => {
        setFormData({...datos, [e.target.name]: e.target.value});
    };

    const validarDocumento= async () => { //Validar si el documento ya existe
        if (!FormData.documento) return;
        try{
            const respuesta= await fetch(`http://localhost:3001/usuarios?documento=${datos.documento}`);
            const usuarios= await respuesta.json();
            if (usuarios.length>0){
                setError("Este número de documento ya está registrado");
            }
        }catch(err){
            console.error("Error al conectar con la API")
        }
    };

    const registrarUsuario= async (e) => {
        e.preventDefault();
        if(error) return;
        const {confirmarContrasena, ...datosFinales}= formData //Quitar confirmar contraseña antes de enviar a API
        try{
            const response= await fetch("http://localhost:3001/usuarios",{
                method:"POST",
                headers:{ "Content-Type": "application/json" },
                body: JSON.stringify(datosFinales)
            });
            if(response.ok){
                alert("¡Te Registraste Exitosamente!");
            }
        }catch(err){
            setError("Error al conectar con el servidor");
        }
    };
    return (
        <div className="pantalla-registro">
            <div className="tarjeta-registro">
                <div style={{textAlign: 'center'}}><img src={LogoVM} width="70" alt="Logo"/></div>
                <h2>Crea tu cuenta</h2>
                {error && <p className="mensaje-error">{error}</p>}
                <form className="formulario-registro" onSubmit={registrarUsuario}>
                    <div className="campo-registro">
                        <input type="text" name="primerNombre" required onChange={manejarCambio}/>
                        <label>Primer Nombre</label>
                    </div>
                    <div className="campo-registro">
                        <input type="text" name="segundoNombre" onChange={manejarCambio}/>
                        <label>Segundo Nombre</label>
                    </div>
                    <div className="campo-registro">
                        <input type="text" name="primerApellido" required onChange={manejarCambio}/>
                        <label>Primer Apellido</label>
                    </div>
                    <div className="campo-registro">
                        <input type="text" name="segundoApellido" onChange={manejarCambio}/>
                        <label>Segundo Apellido</label>
                    </div>
                    <div className="campo-registro">
                        <input
                        type="number"
                        name="documento"
                        required
                        onChange={manejarCambio}
                        onBlur={validarDocumento}
                        />
                        <label>Documento Identidad</label>
                    </div>
                    <div className="campo-registro">
                        <input type="date" name="fechaNacimiento" required onChange={manejarCambio}/>
                        <label></label>
                    </div>
                    <div className="campo-registro">
                        <input type="tel" name="telefono" required onChange={manejarCambio}/>
                        <label>Telefono / Celular</label>
                    </div>
                    <div className="campo-registro">
                        <input type="text" name="direccion" required onChange={manejarCambio}/>
                        <label>Dirección</label>
                    </div>
                    <div className="campo-registro">
                        <input type="email" name="correo" required onChange={manejarCambio}/>
                        <label>Correo Electrónico</label>
                    </div>
                    <div className="campo-registro">
                        <input type="password" name="contrasena" required onChange={manejarCambio}/>
                        <label>Contraseña</label>
                    </div>
                    <div className="campo-registro">
                        <input type="password" name="confirmarContrasena" required onChange={manejarCambio}/>
                        <label>Confirmar Contraseña</label>
                    </div>
                    <button type="submit" className="boton-registro" disabled={error !== ""}>
                        Registrarse
                    </button>
                </form>
                <span 
                className="link-volver"
                onClick={alCambiarLogin}
                >
                    Volver al Login
                </span>
            </div>
        </div>
    );
};
export default Registro;