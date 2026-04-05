import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export default function AgendarCita() {
  const location = useLocation();
  const navigate = useNavigate();
  const citaEditar = location.state?.cita || null;
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (citaEditar) {
      setFecha(citaEditar.fecha);
      setHora(citaEditar.hora);
      setDescripcion(citaEditar.descripcion || "");
      setIsEdit(true);
    }
  }, [citaEditar]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        const response = await fetch(`${API_URL}/citas/${citaEditar.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fecha, hora, descripcion }),
        });
        if (!response.ok) throw new Error("Error al reprogramar la cita");
        alert(`Cita reprogramada a ${fecha} a las ${hora}.`);
      } else {
        const response = await fetch(`${API_URL}/citas`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fecha, hora, descripcion }),
        });
        if (!response.ok) throw new Error("Error al agendar la cita");
        alert(`Cita agendada para ${fecha} a las ${hora}.`);
      }
      navigate("/home");
    } catch (error) {
      console.error(error);
      alert("No se pudo guardar la cita. Intenta de nuevo.");
    }
  };

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        backgroundColor: "#FAFAF9",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h1 style={{ color: "#E8580A", textAlign: "center" }}>
        {isEdit ? "Reprogramar Cita" : "Agendar Cita"}
      </h1>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "400px",
          margin: "0 auto",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="fecha"
            style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}
          >
            Fecha:
          </label>
          <input
            type="date"
            id="fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="hora"
            style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}
          >
            Hora:
          </label>
          <input
            type="time"
            id="hora"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="descripcion"
            style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}
          >
            Descripción:
          </label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows="4"
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#E8580A",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          {isEdit ? "Guardar cambios" : "Agendar Cita"}
        </button>
      </form>
    </div>
  );
}
