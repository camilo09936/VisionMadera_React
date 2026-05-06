import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export default function ReprogramarCita() {
  const [citas, setCitas] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/citas`)
      .then((response) => response.json())
      .then((data) => setCitas(data))
      .catch((error) => console.error("Error cargando citas:", error));
  }, []); //Trae todas las citas al cargar

  useEffect(() => {
    const cita = citas.find((item) => item.id === selectedId);
    if (cita) {
      setFecha(cita.fecha);
      setHora(cita.hora);
      setDescripcion(cita.descripcion || "");
    }
  }, [selectedId, citas]); //Se dispara cada que el usuario elija una cita diferente en el select. Busca este objeto con .find() y prellena los campos.

  const selectedCita = citas.find((item) => item.id.toString() === selectedId);

  const handleSubmit = async (e) => {
    //Hace PATCH para guardar nuevos datos. luego actualiza el array en pantalla con .map() sin necesidad de volver a llamar la API
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
        prev.map(
          (cita) =>
            cita.id === selectedId
              ? { ...cita, fecha, hora, descripcion }
              : cita, //aca lo anterior
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
        backgroundColor: "#FFF5EE",
        minHeight: "100vh",
        padding: "30px 20px",
      }}
    >
      <style>{`
        input::placeholder,
        textarea::placeholder,
        select {
          color: #9b9b9b;
          opacity: 1;
        }
      `}</style>
      <div style={{ maxWidth: "520px", margin: "0 auto" }}>
        <h1
          style={{
            color: "#E8580A",
            textAlign: "center",
            marginBottom: "6px",
            fontSize: "30px",
          }}
        >
          🔄 Reprogramar Cita
        </h1>
        <p
          style={{
            color: "#6d6d6d",
            textAlign: "center",
            marginBottom: "18px",
          }}
        >
          Elige la cita y actualiza fecha, hora y descripción con estilo.
        </p>
        <button
          type="button"
          onClick={() => navigate("/home")}
          style={{
            display: "block",
            margin: "0 auto 26px",
            padding: "10px 18px",
            borderRadius: "999px",
            border: "1px solid #E8580A",
            backgroundColor: "#ffffff",
            color: "#E8580A",
            fontWeight: 700,
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#E8580A";
            e.target.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#ffffff";
            e.target.style.color = "#E8580A";
          }}
        >
          ← Volver al Home
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "520px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          padding: "28px",
          borderRadius: "20px",
          boxShadow: "0 24px 60px rgba(228, 120, 60, 0.12)",
          border: "1px solid rgba(232, 88, 10, 0.14)",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="select-cita"
            style={{
              display: "block",
              marginBottom: "10px",
              fontWeight: "700",
              color: "#333",
            }}
          >
            📌 Selecciona la cita a reprogramar
          </label>
          <select
            id="select-cita"
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "14px 16px",
              border: "2px solid #E8E8E8",
              borderRadius: "16px",
              backgroundColor: "#f5f3f1",
              fontSize: "14px",
              boxSizing: "border-box",
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
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="fecha"
            style={{
              display: "block",
              marginBottom: "10px",
              fontWeight: "700",
              color: "#333",
            }}
          >
            📆 Nueva fecha
          </label>
          <input
            type="date"
            id="fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "14px 16px",
              border: "2px solid #E8E8E8",
              borderRadius: "16px",
              backgroundColor: "#f8f4f1",
              boxSizing: "border-box",
              fontSize: "14px",
              minHeight: "50px",
              transition: "all 0.25s",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#E8580A";
              e.target.style.backgroundColor = "#fff";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#E8E8E8";
              e.target.style.backgroundColor = "#f8f4f1";
            }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="hora"
            style={{
              display: "block",
              marginBottom: "10px",
              fontWeight: "700",
              color: "#333",
            }}
          >
            ⏰ Nueva hora
          </label>
          <input
            type="time"
            id="hora"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "14px 16px",
              border: "2px solid #E8E8E8",
              borderRadius: "16px",
              backgroundColor: "#f8f4f1",
              boxSizing: "border-box",
              fontSize: "14px",
              minHeight: "50px",
              transition: "all 0.25s",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#E8580A";
              e.target.style.backgroundColor = "#fff";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#E8E8E8";
              e.target.style.backgroundColor = "#f8f4f1";
            }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="descripcion"
            style={{
              display: "block",
              marginBottom: "10px",
              fontWeight: "700",
              color: "#333",
            }}
          >
            📝 Descripción
          </label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows="5"
            placeholder="Describe brevemente qué deseas reprogramar"
            style={{
              width: "100%",
              padding: "14px 16px",
              border: "2px solid #E8E8E8",
              borderRadius: "16px",
              backgroundColor: "#f8f4f1",
              fontSize: "14px",
              color: "#1a1a1a",
              boxSizing: "border-box",
              minHeight: "120px",
              transition: "all 0.25s",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#E8580A";
              e.target.style.backgroundColor = "#fff";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#E8E8E8";
              e.target.style.backgroundColor = "#f8f4f1";
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "14px",
            backgroundColor: "#E8580A",
            color: "#fff",
            border: "none",
            borderRadius: "16px",
            cursor: "pointer",
            fontWeight: "700",
            fontSize: "15px",
            transition: "all 0.25s",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#d15e0c";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#E8580A";
          }}
        >
          Reprogramar Cita
        </button>
      </form>
    </div>
  );
}
