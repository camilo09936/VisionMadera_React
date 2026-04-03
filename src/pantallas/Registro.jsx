import React, { useState } from "react";
import '../styles/Registro.css';
import LogoVM from '../assets/ResourcesRegister/LogoVisionMadera.png';
import VerIcono from '../assets/ResourcesLogin/MostrarContrasena.png';
import OcultarIcono from '../assets/ResourcesLogin/OcultarContrasena.png';

const Registro = ({alCambiarLogin}) => {
    const [datos, setDatos] = useState({
        primerNombre: "", segundoNombre: "",
        primerApellido: "", segundoApellido: "",
        documento: "", fechaNacimiento: "",
        telefono: "", direccion: "",
        correo: "", contrasena: "", confirmarContrasena: ""
    });
    const [error, setError]= useState("");
    const [verContrasena, setVerContrasena] = useState(false);
    const [verConfContrasena, setVerConfContrasena] = useState(false);
    const [errores, setErrores] = useState({});

    const validarFormulario=()=>{
        const nuevosErrores={};
        if(!datos.correo || !validarEmail(datos.correo)){
            nuevosErrores.correo= "El correo no es válido."
        }
        if (!esMayorDeEdad(datos.fechaNacimiento)){
            nuevosErrores.fechaNacimiento= "Debes ser mayor de 18 años.";
        }
        if (!validarTelefono(datos.telefono)){
            nuevosErrores.telefono= "El número de teléfono no es válido.";
        }
        if(datos.contrasena !== datos.confirmarContrasena){
            nuevosErrores.confirmarContrasena= "Las contraseñas no coinciden.";
        }
        if (!datos.correo.trim()){
            nuevosErrores.correo= "Campo obligatorio";
        }
        if (!datos.telefono.trim()){
            nuevosErrores.telefono= "Campo obligatorio";
        }
        if (!datos.fechaNacimiento){
            nuevosErrores.fechaNacimiento= "Campo obligatorio";
        }
        if (!datos.primerNombre.trim()) {
            nuevosErrores.primerNombre = "Campo obligatorio";
        }
        if (!datos.primerApellido.trim()) {
            nuevosErrores.primerApellido = "Campo obligatorio";
        }
        if (!datos.documento.trim()) {
            nuevosErrores.documento = "Campo obligatorio";
        }
        if (!datos.direccion.trim()) {
            nuevosErrores.direccion = "Campo obligatorio";
        }
        if (!datos.contrasena.trim()) {
            nuevosErrores.contrasena = "Campo obligatorio";
        }
        if (!datos.confirmarContrasena.trim()){
            nuevosErrores.confirmarContrasena= "Campo obligatorio";
        }
        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length===0;
    };
    
    const manejarCambio=(e) => {
        const {name,value}=e.target;
        setDatos(prev=>({...prev,[name]:value}));
        validarCampo(name,value);
    };

    const validarEmail= (email) =>{ //Validar Formato Email
        return /\S+@\S+\.\S+/.test(email);
    };

    const esMayorDeEdad= (fecha) =>{ //Validacion > 18
        const hoy= new Date();
        const nacimiento= new Date(fecha);

        let edad= hoy.getFullYear() - nacimiento.getFullYear();
        const m = hoy.getMonth() - nacimiento.getMonth();

        if(m<0 || (m===0 && hoy.getDate()<nacimiento.getDate())){
            edad--;
        }
        return edad >=18;
    }

    const validarTelefono= (tel) => {
        return /^[0-9]{10,11}$/.test(tel);
    }

    const validarDocumento= async () => { //Validar si el documento ya existe
        if (!datos.documento) return;
        try{
            const respuesta= await fetch(`http://localhost:3001/usuarios?documento=${datos.documento}`);
            const usuarios= await respuesta.json();
            if (usuarios.length>0){
                setErrores(prev=>({...prev,documento: "Documento ya registrado."}));
            }
        }catch(err){
            console.error("Error al conectar con la API")
        }
    };

    const validarCampo= (name, value)=>{
        let error= "";
        const camposObligatorios=["primerNombre", "primerApellido", "documento", 
                "fechaNacimiento", "telefono", "direccion", 
                "correo", "contrasena", "confirmarContrasena"
        ];

        if (camposObligatorios.includes(name) && !value.trim()){
            error="Campo obligatorio";
        }
        if(name==="correo" && value && !validarEmail(value)){
            error="El correo no es válido.";
        }
        if(name==="telefono" && value && !validarTelefono(value)){
            error="El teléfono no es válido."
        }
        if(name==="fechaNacimiento" && !esMayorDeEdad(value)){
            error= "Debes ser mayor de 18 años";
        }
        if(name==="confirmarContrasena"){
            if(value !== datos.contrasena){
                error="Las contraseñas no coinciden."
            }
        }
        if (name==="contrasena" && datos.confirmarContrasena){
            if(value !== datos.confirmarContrasena){
                setErrores(prev=>({...prev, confirmarContrasena: "Las contraseñas no coinciden."}));
                }else{
                    setErrores(prev=>({...prev, confirmarContrasena: ""}));
            }
        }
        setErrores(prev=>({...prev,[name]:error}));
    };

    const registrarUsuario= async (e) => {
        e.preventDefault();
        setError(""); //Limpiar Errores Previos

        const esValido=validarFormulario();
        if(!esValido){
            setError("Por favor revisa los campos marcados.");
            window.scrollTo({top: 0, behavior: "smooth"});
            return;
        }

        const {confirmarContrasena, ...datosFinales}= datos //Quitar confirmar contraseña antes de enviar a API
        try{
            const response= await fetch("http://localhost:3001/usuarios",{
                method:"POST",
                headers:{ "Content-Type": "application/json" },
                body: JSON.stringify(datosFinales)
            });

            if(response.ok){
                alert("¡Te Registraste Exitosamente!");
                alCambiarLogin();
            }else{
                setError("Hubo un problema al guardar los datos.");
            }
        }catch(err){
            setError("Error al conectar con el servidor");
        }
    };

    const formularioIncompleto=[
        datos.primerNombre, datos.primerApellido, datos.documento,
        datos.fechaNacimiento, datos.telefono, datos.direccion,
        datos.correo, datos.contrasena, datos.confirmarContrasena].some(campo=>!campo.trim());
    return (
        <div className="pantalla-registro">
            <div className="tarjeta-registro">
                <div style={{textAlign: 'center'}}>
                    <img src={LogoVM} width="95" alt="Logo"/>
                    </div>
                    <h2>Crea tu cuenta</h2>
                    {error && <p className="mensaje-error">{error}</p>}
                    <form className="formulario-registro" onSubmit={registrarUsuario} noValidate>
                        <div className="campo-registro">
                            <input 
                                type="text" 
                                name="primerNombre" 
                                placeholder="" 
                                required 
                                onChange={manejarCambio} 
                                className={errores.primerNombre ? "input-error" : datos.primerNombre ? "input-correcto" : ""}
                            />
                            <label>Primer Nombre</label>
                            {!errores.primerNombre && datos.primerNombre.trim() && (
                                <span className="check-correcto">✔</span>
                                )}
                                {errores.primerNombre && (
                                    <span className="mensaje-campo-error">{errores.primerNombre}
                                    </span>
                                )}
                        </div>
                        <div className="campo-registro">
                            <input 
                                type="text" 
                                name="segundoNombre" 
                                placeholder="" 
                                onChange={manejarCambio}
                                className={errores.segundoNombre ? "input-error" : datos.segundoNombre ? "input-correcto" : ""}
                            />
                            <label>Segundo Nombre</label>
                            {!errores.segundoNombre && datos.segundoNombre.trim() && (
                                <span className="check-correcto">✔</span>
                                )}
                        </div>
                        <div className="campo-registro">
                            <input 
                                type="text" 
                                name="primerApellido" 
                                placeholder="" 
                                required 
                                onChange={manejarCambio}
                                className={errores.primerApellido ? "input-error" : datos.primerApellido ? "input-correcto" : ""}
                            />
                            <label>Primer Apellido</label>
                            {!errores.primerApellido && datos.primerApellido.trim() && (
                                <span className="check-correcto">✔</span>
                                )}
                                {errores.primerApellido && (
                                    <span className="mensaje-campo-error">{errores.primerApellido}
                                    </span>
                                )}
                        </div>
                        <div className="campo-registro">
                            <input 
                                type="text" 
                                name="segundoApellido" 
                                placeholder="" 
                                onChange={manejarCambio}
                                className={errores.segundoApellido ? "input-error" : datos.segundoApellido ? "input-correcto" : ""}
                            />
                            <label>Segundo Apellido</label>
                            {!errores.segundoApellido && datos.segundoApellido.trim() && (
                                <span className="check-correcto">✔</span>
                                )}
                        </div>
                        <div className="campo-registro">
                            <input
                                type="text"
                                name="documento"
                                placeholder=""
                                required
                                onChange={manejarCambio}
                                onBlur={validarDocumento}
                                className={errores.documento ? "input-error" : datos.documento ? "input-correcto" : ""}
                            />
                            <label>Documento Identidad</label>
                            {!errores.documento && datos.documento.trim() && (
                                <span className="check-correcto">✔</span>
                                )}
                                {errores.documento && (
                                    <span className="mensaje-campo-error">{errores.documento}
                                    </span>
                                )}
                        </div>
                        <div className="campo-registro">
                            <input 
                                type="date" 
                                name="fechaNacimiento" 
                                required 
                                onChange={manejarCambio}
                                value={datos.fechaNacimiento}
                                className={errores.fechaNacimiento ? "input-error" : datos.fechaNacimiento ? "input-correcto" : ""}
                            />
                            <label>Fecha Nacimiento</label>
                            {!errores.fechaNacimiento && datos.fechaNacimiento && esMayorDeEdad(datos.fechaNacimiento) && (
                                <span className="check-correcto">✔</span>
                                )}
                                {errores.fechaNacimiento && (
                                    <span className="mensaje-campo-error">{errores.fechaNacimiento}
                                    </span>
                                )}
                        </div>
                        <div className="campo-registro">
                            <input 
                                type="tel" 
                                name="telefono" 
                                placeholder="" 
                                required 
                                onChange={manejarCambio} 
                                className={errores.telefono ? "input-error" : datos.telefono ? "input-correcto" : ""}
                                maxLength="11"
                            />
                            <label>Telefono / Celular</label>
                            {!errores.telefono && datos.telefono.trim() && validarTelefono(datos.telefono) && (
                                <span className="check-correcto">✔</span>
                                )}
                                {errores.telefono && (
                                    <span className="mensaje-campo-error">{errores.telefono}
                                    </span>
                                )}
                        </div>
                        <div className="campo-registro">
                            <input 
                                type="text" 
                                name="direccion" 
                                placeholder="" 
                                required 
                                onChange={manejarCambio}
                                className={errores.direccion ? "input-error" : datos.direccion ? "input-correcto" : ""}
                            />
                            <label>Dirección</label>
                            {!errores.direccion && datos.direccion.trim() && (
                                <span className="check-correcto">✔</span>
                                )}
                                {errores.direccion && (
                                    <span className="mensaje-campo-error">{errores.direccion}
                                    </span>
                                )}
                        </div>
                        <div className="campo-registro">
                            <input 
                                type="email" 
                                name="correo" 
                                placeholder="" 
                                required 
                                onChange={manejarCambio}
                                className={errores.correo ? "input-error" : datos.correo ? "input-correcto" : ""}
                            />
                            <label>Correo Electrónico</label>
                            {!errores.correo && datos.correo.trim() && validarEmail(datos.correo) && (
                                <span className="check-correcto">✔</span>
                                )}
                                {errores.correo && (
                                    <span className="mensaje-campo-error">{errores.correo}
                                    </span>
                                )}
                        </div>
                        <div className="campo-registro">
                            <input
                                type={verContrasena ? "text" : "password"}
                                name="contrasena"
                                placeholder=" " 
                                required
                                onChange={manejarCambio}
                                className={errores.contrasena ? "input-error" : datos.contrasena ? "input-correcto" : ""}
                            />
                            <label>Contraseña</label>
                            {!errores.contrasena && datos.contrasena.trim() && (
                                <span className="check-correcto check-con-ojo">✔</span>
                                )}
                                {errores.contrasena && (
                                    <span className="mensaje-campo-error">{errores.contrasena}
                                    </span>
                                )}
                            <img
                                src={verContrasena ? OcultarIcono : VerIcono}
                                className="icono-ojo-registro"
                                onClick={()=>setVerContrasena(!verContrasena)}
                                alt="Ver/Ocultar"
                            />
                        </div>
                        <div className="campo-registro">
                            <input 
                                type={verConfContrasena ? "text" : "password"} 
                                name="confirmarContrasena" 
                                placeholder=" " 
                                required
                                onChange={manejarCambio}
                                className={errores.confirmarContrasena ? "input-error" : datos.confirmarContrasena ? "input-correcto" : ""}
                            />
                            <label>Confirmar Contraseña</label>
                            {!errores.confirmarContrasena && datos.confirmarContrasena.trim() && (
                                <span className="check-correcto check-con-ojo">✔</span>
                                )}
                                {errores.confirmarContrasena && (
                                    <span className="mensaje-campo-error">{errores.confirmarContrasena}
                                    </span>
                                )}
                            <img
                                src={verConfContrasena ? OcultarIcono : VerIcono}
                                className="icono-ojo-registro"
                                onClick={()=>setVerConfContrasena(!verConfContrasena)}
                                alt="Ver/Ocultar"
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="boton-registro"
                            >
                            Registrarse
                        </button>
                    </form>
                    <span className="link-volver" onClick={alCambiarLogin}>
                        Volver al Login
                    </span>
                </div>
            </div>
        );
};
export default Registro;