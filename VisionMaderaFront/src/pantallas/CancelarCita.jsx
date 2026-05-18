import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function CancelarCita() {
  const [citas, setCitas] = useState([]);
  const [mostrarModalError, setMostrarModalError] = useState(false);
  const [mensajeModal, setMensajeModal] = useState("");
  const navigate = useNavigate();

  // Diccionarios de datos
  const nombresSedes = {
    1: "Sede Norte",
    2: "Sede Sur",
    3: "Sede Centro",
    4: "Sede Bello",
    5: "Sede Itagüí"
  };

  const horasBloques = {
    1: "08:00 - 10:00",
    2: "10:00 - 12:00",
    3: "12:00 - 14:00",
    4: "14:00 - 16:00"
  };

  // Obtener la lista de citas 
  const obtenerCitas = async () => {
    try {
      const response = await fetch(`${API_URL}/Cita`);
      
      if (!response.ok) {
        throw new Error(`Error en el servidor: ${response.status}`);
      }

      const data = await response.json();
      
      if (data && Array.isArray(data)) {
        setCitas(data);
      } else if (data && Array.isArray(data.data)) {
        setCitas(data.data);
      } else {
        setCitas([]);
      }
    } catch (error) {
      console.error("Error cargando citas para cancelar:", error);
      setMensajeModal("No se pudieron cargar las citas");
      setMostrarModalError(true);
      setCitas([]);
    }
  };

  useEffect(() => {
    obtenerCitas();
  }, []);

  // Función para procesar la cancelación
  const gestionarCancelarCita = async (idCita) => {
    if (!window.confirm("¿Estás seguro de que deseas cancelar esta cita?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/Cita/${idCita}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("No se pudo eliminar la cita en el servidor.");
      }

      // Refrescar las citas restantes tras una eliminación exitosa
      obtenerCitas();
    } catch (error) {
      console.error("Error al intentar cancelar la cita:", error);
      setMensajeModal("No se pudo procesar la cancelación de la cita en este momento.");
      setMostrarModalError(true);
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
    marginTop: "18px", padding: "12px 22px", backgroundColor: "#fff", color: "#333", border: "1px solid #E8580A", borderRadius: "999px", cursor: "pointer", fontSize: "14px", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "8px", transition: "all 0.2s",
  }}
  onMouseEnter={(e) => { e.target.style.backgroundColor = "#E8580A"; e.target.style.color = "#fff"; }}
  onMouseLeave={(e) => { e.target.style.backgroundColor = "#fff"; e.target.style.color = "#333"; }}
>
  ← Volver al inicio
</button>

      {/* TÍTULO */}
      <h1
        style={{
          textAlign: "center",
          color: "#E8580A",
          fontSize: "32px",
          fontWeight: "700",
          marginBottom: "40px",
        }}
      >
        Cancelar Citas
      </h1>

      {/* CONTENEDOR DE LA TABLA */}
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "32px",
          maxWidth: "1000px",
          margin: "0 auto",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          border: "1px solid #eee",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #E8580A" }}>
              <th style={{ padding: "12px 8px", color: "#1a1a1a", fontWeight: "600" }}>Fecha</th>
              <th style={{ padding: "12px 8px", color: "#1a1a1a", fontWeight: "600" }}>Hora</th>
              <th style={{ padding: "12px 8px", color: "#1a1a1a", fontWeight: "600" }}>Descripción</th>
              <th style={{ padding: "12px 8px", color: "#1a1a1a", fontWeight: "600" }}>Sede</th>
              <th style={{ padding: "12px 8px", color: "#1a1a1a", fontWeight: "600", textAlign: "center" }}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {citas.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", color: "#888", padding: "40px 0", fontSize: "14px" }}>
                  No hay citas registradas 📅
                </td>
              </tr>
            ) : (
              citas.map((cita) => {
                const idCitaReal = cita.id_cita || cita.id;
                const sedeTexto = nombresSedes[cita.id_sede] || `Sede (ID: ${cita.id_sede})`;
                const horaTexto = horasBloques[cita.id_bloque] || "Por confirmar";

                return (
                  <tr key={idCitaReal} style={{ borderBottom: "1px solid #f5f5f5" }}>
                    <td style={{ padding: "16px 8px", fontSize: "14px", color: "#333" }}>{cita.fecha}</td>
                    <td style={{ padding: "16px 8px", fontSize: "14px", color: "#333" }}>{horaTexto}</td>
                    <td style={{ padding: "16px 8px", fontSize: "14px", color: "#555" }}>
                      Cita de Diseño Especializado
                    </td>
                    <td style={{ padding: "16px 8px", fontSize: "14px", color: "#333" }}>{sedeTexto}</td>
                    <td style={{ padding: "16px 8px", textAlign: "center" }}>
                      <button
                        onClick={() => gestionarCancelarCita(idCitaReal)}
                        style={{
                          backgroundColor: "#E8580A",
                          color: "#fff",
                          border: "none",
                          borderRadius: "8px",
                          padding: "8px 16px",
                          fontSize: "13px",
                          fontWeight: "500",
                          cursor: "pointer",
                          transition: "background-color 0.2s"
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = "#c64604"}
                        onMouseLeave={(e) => e.target.style.backgroundColor = "#E8580A"}
                      >
                        Cancelar Cita
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* VENTANA EMERGENTE (MODAL ERROR) */}
      {mostrarModalError && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "24px 32px",
              borderRadius: "16px",
              maxWidth: "400px",
              width: "90%",
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
              textAlign: "left",
            }}
          >
            <p style={{ color: "#333", fontSize: "15px", marginBottom: "24px", lineHeight: "1.5" }}>
              {mensajeModal}
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={() => setMostrarModalError(false)}
                style={{
                  backgroundColor: "transparent",
                  color: "#E8580A",
                  border: "none",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}