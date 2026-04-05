import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export default function ReprogramarCita() {
  const [citas, setCitas] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/citas`)
      .then((response) => response.json())
      .then((data) => setCitas(data))
      .catch((error) => console.error("Error cargando citas:", error));
  }, []);

  useEffect(() => {
    const cita = citas.find((item) => item.id === selectedId);
    if (cita) {
      setFecha(cita.fecha);
      setHora(cita.hora);
      setDescripcion(cita.descripcion || "");
    }
  }, [selectedId, citas]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedId) {
      alert("Selecciona primero una cita para reprogramar.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/citas/${selectedId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fecha, hora, descripcion }),
      });
      if (!response.ok) throw new Error("Error al reprogramar la cita");
      alert(`Cita reprogramada para ${fecha} a las ${hora}.`);
      setCitas((prev) =>
        prev.map((cita) =>
          cita.id === selectedId ? { ...cita, fecha, hora, descripcion } : cita,
        ),
      );
    } catch (error) {
      console.error(error);
      alert("No se pudo reprogramar la cita. Intenta de nuevo.");
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
        Reprogramar Cita
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
            htmlFor="select-cita"
            style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}
          >
            Cita a reprogramar:
          </label>
          <select
            id="select-cita"
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            <option value="">Selecciona una cita</option>
            {citas.map((cita) => (
              <option key={cita.id} value={cita.id}>
                {cita.fecha} {cita.hora} -{" "}
                {cita.descripcion || "Sin descripción"}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="fecha"
            style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}
          >
            Nueva Fecha:
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
            Nueva Hora:
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
          Reprogramar Cita
        </button>
      </form>
    </div>
  );
}
