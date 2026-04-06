import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export default function CancelarCita() {
const [citas, setCitas] = useState([]);
const navigate = useNavigate();

// Obtener citas
const obtenerCitas = async () => { //Hace GET y guarda en citas[] 
try {
const response = await fetch(`${API_URL}/citas`);
if (!response.ok) throw new Error("Error al obtener citas");

  const data = await response.json();
  setCitas(data);
} catch (error) {
  console.error(error);
  alert("No se pudieron cargar las citas");
}

};

useEffect(() => {
obtenerCitas();
}, []); //Se llama al cargar

// Eliminar cita
const eliminarCita = async (id) => { //Pregunta con confirmar si el usuario accepta hace fetch DELETE. Si la api responde bien, actualiza el array en pantalla con .filter()
const confirmar = confirm("¿Seguro que deseas cancelar esta cita?");
if (!confirmar) return; 

try {
  const response = await fetch(`${API_URL}/citas/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Error al eliminar");

  setCitas(citas.filter((cita) => cita.id !== id)); //.filter devuelve un nuevo array con todas las citas excepto la que tiene ese id. React Rerenderiza y la fila desaparece.
} catch (error) {
  console.error(error);
  alert("No se pudo eliminar la cita");
}

};

return (
<div
style={{
fontFamily: "Poppins, sans-serif",
backgroundColor: "#FAFAF9",
minHeight: "100vh",
padding: "40px 20px",
position: "relative",
}}
>
{/* BOTÓN VOLVER */}
<button
onClick={() => navigate("/home")}
style={{
position: "absolute",
top: "20px",
left: "20px",
backgroundColor: "#fff",
border: "1px solid #ddd",
borderRadius: "50%",
width: "42px",
height: "42px",
cursor: "pointer",
fontSize: "20px",
boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
}}
>
🔙 </button>

  <h1
    style={{
      color: "#E8580A",
      textAlign: "center",
      marginBottom: "30px",
    }}
  >
    Cancelar Citas
  </h1>

  {/*  CONTENEDOR TABLA */}
  <div
    style={{
      maxWidth: "1000px",
      margin: "0 auto",
      backgroundColor: "#fff",
      padding: "30px",
      borderRadius: "10px",
      border: "1px solid #eee",
    }}
  >
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
      }}
    >
      <thead>
        <tr
          style={{
            borderBottom: "2px solid #E8580A",
            textAlign: "left",
          }}
        >
          <th style={{ padding: "12px" }}>Fecha</th>
          <th style={{ padding: "12px" }}>Hora</th>
          <th style={{ padding: "12px" }}>Descripción</th>
          <th style={{ padding: "12px" }}>Sede</th>
          <th style={{ padding: "12px", textAlign: "center" }}>
            Acción
          </th>
        </tr>
      </thead>

      <tbody>
        {citas.length === 0 ? (
          <tr>
            <td
              colSpan="5"
              style={{
                textAlign: "center",
                padding: "25px",
                color: "#888",
              }}
            >
              No hay citas registradas 📅
            </td>
          </tr>
        ) : (
          citas.map((cita) => (
            <tr
              key={cita.id}
              style={{
                borderBottom: "1px solid #f1f1f1",
              }}
            >
              <td style={{ padding: "14px" }}>{cita.fecha}</td>
              <td style={{ padding: "14px" }}>{cita.hora}</td>
              <td style={{ padding: "14px" }}>
                {cita.descripcion || "Sin descripción"}
              </td>
              <td style={{ padding: "14px" }}>
                {cita.lugar || "Sin sede"}
              </td>

              <td style={{ textAlign: "center" }}>
                <button
                  onClick={() => eliminarCita(cita.id)}
                  style={{
                    backgroundColor: "#fff",
                    color: "red",
                    border: "1px solid #eee",
                    borderRadius: "6px",
                    padding: "6px 10px",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                >
                  ✖
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
</div>

);
}
