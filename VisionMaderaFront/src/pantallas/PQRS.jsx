import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function Pqrs() {
  const navigate = useNavigate();
  const [tiposPqrs, setTiposPqrs] = useState([]);
  const [citas, setCitas] = useState([]);
  const [formData, setFormData] = useState({
    id_tipo_pqrs: "",
    id_cita: "", 
    descripcion: "",
    id_usuario: localStorage.getItem("idUsuario") || 1
  });

  useEffect(() => {
    // 1. Cargar tipos de PQRS
    fetch(`${API_URL}/TipoPqrs`)
      .then(res => res.json())
      .then(data => setTiposPqrs(data))
      .catch(err => console.error("Error tipos:", err));

    // 2. Cargar las citas del usuario
    const idUsuario = localStorage.getItem("idUsuario") || 1;
    fetch(`${API_URL}/Cita/usuario/${idUsuario}`) 
      .then(res => res.json())
      .then(data => setCitas(data))
      .catch(err => console.error("Error citas:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación básica para evitar envíos vacíos
    if (!formData.id_tipo_pqrs || !formData.descripcion) {
      alert("Por favor rellena el tipo y la descripción");
      return;
    }

    const datosAEnviar = {
      ...formData,
      // Mantenemos la lógica de concatenar si no has modificado la tabla SQL
      descripcion: formData.id_cita 
        ? `[Cita Ref: ${formData.id_cita}] - ${formData.descripcion}` 
        : formData.descripcion
    };

    try {
      const response = await fetch(`${API_URL}/PQRS`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosAEnviar),
      });

      if (response.ok) {
        alert("¡PQRS enviada con éxito!");
        navigate("/home"); // Redirige al home tras el éxito
      } else {
        alert("Hubo un error al enviar al servidor");
      }
    } catch (error) {
      console.error("Error de red:", error);
      alert("No se pudo conectar con el servidor");
    }
  };

  return (
    <div style={{ fontFamily: "Poppins, sans-serif", padding: "48px", backgroundColor: "#FAFAF9", minHeight: "100vh" }}>
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
<form onSubmit={handleSubmit}></form>
      <div style={{ maxWidth: "600px", margin: "0 auto", backgroundColor: "#fff", padding: "30px", borderRadius: "12px", border: "1px solid #eee", boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}>
      <h2 style={{ color: "#E8580A", marginBottom: "20px" }}>Nueva PQRS</h2>
        
        <form onSubmit={handleSubmit}>
          {/* SELECTOR DE TIPO */}
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: "5px" }}>Tipo de PQRS</label>
            <select 
              required
              style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd" }}
              value={formData.id_tipo_pqrs} //  Vincular al estado
              onChange={(e) => setFormData({...formData, id_tipo_pqrs: e.target.value})}
            >
              <option value="">Seleccione...</option>
              {tiposPqrs.map(t => <option key={t.id_tipo_pqrs} value={t.id_tipo_pqrs}>{t.nombre}</option>)}
            </select>
          </div>

          {/* SELECTOR DE CITA */}
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: "5px" }}>Relacionar con una cita (Opcional)</label>
            <select 
              style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd" }}
              value={formData.id_cita} // IMPORTANTE: Vincular al estado
              onChange={(e) => setFormData({...formData, id_cita: e.target.value})}
            >
              <option value="">No aplica / PQRS General</option>
              {citas.map(c => (
                <option key={c.id_cita} value={c.id_cita}>
                  Cita: {c.fecha.split('T')[0]} - {c.hora}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: "5px" }}>Descripción</label>
            <textarea 
              required
              placeholder="Cuéntanos más detalles..."
              style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd", height: "120px", resize: "none" }}
              value={formData.descripcion} // IMPORTANTE: Vincular al estado
              onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
            />
          </div>

          {/* Botón con tipo explícito */}
          <button 
            type="submit" 
            style={{ width: "100%", backgroundColor: "#E8580A", color: "#fff", border: "none", padding: "14px", borderRadius: "8px", fontWeight: 600, cursor: "pointer" }}
          >
            Enviar 
          </button>
        </form>
      </div>
    </div>
  );
}