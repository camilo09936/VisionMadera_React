import React, { useState } from "react";
import Login from "./pantallas/Login"
import Registro from "./pantallas/Registro";

function App() {
  const [pantallaActual, setPantallaActual]= useState("login");
  return (
    <div className="App">
      {pantallaActual === 'login' && (
        <Login alCambiarRegistro={()=> setPantallaActual('registro')}/>
      )}
      {pantallaActual === 'registro' && (
        <Registro alCambiarLogin={()=> setPantallaActual('login')}/>
      )}
    </div>
  );
}

export default App
