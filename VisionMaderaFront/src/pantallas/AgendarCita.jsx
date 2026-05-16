import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function AgendarCita() {
  const location = useLocation();
  const navigate = useNavigate();
  const citaEditar = location.state?.cita || null; //Si otra pantalla llega aca pasando una cita, llega por location.state, El ?. evita error si no viene nada.
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [isEdit, setIsEdit] = useState(false); //Estado booleano que empiieza en false. si llego una cita para editar, useffect lo pone en true y prellena los campos.

  useEffect(() => {
    if (citaEditar) {
      setFecha(citaEditar.fecha);
      setHora(citaEditar.hora);
      setDescripcion(citaEditar.descripcion || "");
      setIsEdit(true);
    }
  }, [citaEditar]);

  const handleSubmit = async (e) => {
    //Decide que metodo usar segun isEdit: True: Patch/ False:POST
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
        padding: "40px 20px",
      }}
    >
      <style>{`
      input::placeholder,
      textarea::placeholder {
      color: #999;
      opacity: 1;
      }
      input[type="date"]::-webkit-datetime-edit,
      input[type="date"]::-webkit-datetime-edit-fields-wrapper,
      input[type="date"]::-webkit-datetime-edit-text,
      input[type="date"]::-webkit-datetime-edit-month-field,
      input[type="date"]::-webkit-datetime-edit-day-field,
      input[type="date"]::-webkit-datetime-edit-year-field,
      input[type="time"]::-webkit-datetime-edit,
      input[type="time"]::-webkit-datetime-edit-fields-wrapper,
      input[type="time"]::-webkit-datetime-edit-text,
      input[type="time"]::-webkit-datetime-edit-hour-field,
      input[type="time"]::-webkit-datetime-edit-minute-field,
      input[type="time"]::-webkit-datetime-edit-ampm-field {
      color: #1a1a1a !important;
      }
      input[type="date"], input[type="time"]{
        position: relative;
      }
      input[type="date"]::-webkit-calendar-picker-indicator,
      input[type="time"]::-webkit-calendar-picker-indicator {
      cursor: pointer;
      filter: invert(0.1);
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      margin: 0;
      padding: 0;
      }
      `}</style>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Encabezado */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <h1
            style={{
              color: "#E8580A",
              fontSize: 32,
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            📅 {isEdit ? "Reprogramar Cita" : "Agendar Cita"}
          </h1>
          <p style={{ color: "#666", fontSize: 14 }}>
            Completa los detalles de tu cita en Madecentro
          </p>
          <button
            onClick={() => navigate("/home")}
            style={{
              marginTop: "18px",
              padding: "12px 22px",
              backgroundColor: "#fff",
              color: "#333",
              border: "1px solid #E8580A",
              borderRadius: "999px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#E8580A";
              e.target.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#fff";
              e.target.style.color = "#333";
            }}
          >
            ← Volver al inicio
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 30,
            alignItems: "start",
          }}
        >
          {/* Formulario */}
          <form
            onSubmit={handleSubmit}
            style={{
              backgroundColor: "#fff",
              padding: "32px",
              borderRadius: "12px",
            }}
          >
            {/* Fecha */}
            <div style={{ marginBottom: "24px" }}>
              <label
                htmlFor="fecha"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: "10px",
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                📆 Fecha de la cita
              </label>
              <input
                type="date"
                id="fecha"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "16px 14px",
                  border: "2px solid #E8E8E8",
                  borderRadius: "12px",
                  fontSize: 14,
                  fontFamily: "Poppins, sans-serif",
                  transition: "all 0.3s",
                  boxSizing: "border-box",
                  color: "#1a1a1a",
                  backgroundColor: "#f2f2f7",
                  minHeight: "52px",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#E8580A";
                  e.target.style.backgroundColor = "#fff";
                  e.target.style.boxShadow = "0 0 0 3px rgba(232, 88, 10, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#E8E8E8";
                  e.target.style.backgroundColor = "#f2f2f7";
                  e.target.style.boxShadow = "none";
                }}
              />
              <p style={{ fontSize: 12, color: "#888", marginTop: 8 }}>
                Formato: dd/mm/aaaa
              </p>
              {fecha && (
                <p style={{ fontSize: 12, color: "#E8580A", marginTop: 6 }}>
                  ✓{" "}
                  {new Date(fecha).toLocaleDateString("es-ES", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              )}
            </div>

            {/* Hora */}
            <div style={{ marginBottom: "24px" }}>
              <label
                htmlFor="hora"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: "10px",
                  fontWeight: 600,
                  color: "#1a1a1a",
                  fontSize: 14,
                }}
              >
                🕐 Hora de la cita
              </label>
              <input
                type="time"
                id="hora"
                value={hora}
                onChange={(e) => setHora(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "16px 14px",
                  border: "2px solid #E8E8E8",
                  borderRadius: "12px",
                  fontSize: 14,
                  fontFamily: "Poppins, sans-serif",
                  transition: "all 0.3s",
                  boxSizing: "border-box",
                  color: "#1a1a1a",
                  backgroundColor: "#f2f2f7",
                  minHeight: "52px",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#E8580A";
                  e.target.style.backgroundColor = "#fff";
                  e.target.style.boxShadow = "0 0 0 3px rgba(232, 88, 10, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#E8E8E8";
                  e.target.style.backgroundColor = "#f2f2f7";
                  e.target.style.boxShadow = "none";
                }}
              />
              <p style={{ fontSize: 12, color: "#888", marginTop: 8 }}>
                Formato: hh:mm
              </p>
              {hora && (
                <p style={{ fontSize: 12, color: "#E8580A", marginTop: 6 }}>
                  ✓ {hora}
                </p>
              )}
            </div>

            {/* Descripción */}
            <div style={{ marginBottom: "24px" }}>
              <label
                htmlFor="descripcion"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: "10px",
                  fontWeight: 600,
                  color: "#1a1a1a",
                  fontSize: 14,
                }}
              >
                📝 Descripción / Tipo de servicio
              </label>
              <textarea
                id="descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Ej: Diseño de mueble personalizado, consulta sobre materiales..."
                rows="5"
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  border: "2px solid #E8E8E8",
                  borderRadius: "8px",
                  fontSize: 14,
                  fontFamily: "Poppins, sans-serif",
                  resize: "none",
                  boxSizing: "border-box",
                  color: "#1a1a1a",
                  backgroundColor: "#f9f9f9",
                  transition: "all 0.3s",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#E8580A";
                  e.target.style.backgroundColor = "#fff";
                  e.target.style.boxShadow = "0 0 0 3px rgba(232, 88, 10, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#E8E8E8";
                  e.target.style.backgroundColor = "#f9f9f9";
                  e.target.style.boxShadow = "none";
                }}
              />
              <p
                style={{
                  fontSize: 12,
                  color: "#888",
                  marginTop: 6,
                  textAlign: "right",
                }}
              >
                {descripcion.length} caracteres
              </p>
            </div>

            {/* Botón */}
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "14px",
                backgroundColor: "#E8580A",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: 14,
                transition: "all 0.3s",
                boxShadow: "0 4px 12px rgba(232, 88, 10, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#d1480a";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 16px rgba(232, 88, 10, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#E8580A";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 12px rgba(232, 88, 10, 0.3)";
              }}
            >
              {isEdit ? "💾 Guardar Cambios" : "✓ Agendar Cita"}
            </button>
          </form>

          {/* Resumen de Cita */}
          <div
            style={{
              backgroundColor: "#FDF0E8",
              padding: "32px",
              borderRadius: "12px",
              border: "2px solid #E8580A",
              position: "sticky",
              top: "20px",
            }}
          >
            <h2
              style={{
                color: "#E8580A",
                fontSize: 18,
                fontWeight: 700,
                marginBottom: 24,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              📋 Resumen de tu cita
            </h2>

            <div
              style={{
                backgroundColor: "#fff",
                padding: "16px",
                borderRadius: "8px",
                marginBottom: "16px",
                borderLeft: "4px solid #E8580A",
              }}
            >
              <p style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>
                FECHA
              </p>
              <p
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#1a1a1a",
                }}
              >
                {fecha
                  ? new Date(fecha).toLocaleDateString("es-ES", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "No seleccionada"}
              </p>
            </div>

            <div
              style={{
                backgroundColor: "#fff",
                padding: "16px",
                borderRadius: "8px",
                marginBottom: "16px",
                borderLeft: "4px solid #E8580A",
              }}
            >
              <p style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>
                HORA
              </p>
              <p
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#1a1a1a",
                }}
              >
                {hora ? hora : "No seleccionada"}
              </p>
            </div>

            <div
              style={{
                backgroundColor: "#fff",
                padding: "16px",
                borderRadius: "8px",
                marginBottom: "24px",
                borderLeft: "4px solid #E8580A",
              }}
            >
              <p style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>
                DESCRIPCIÓN
              </p>
              <p
                style={{
                  fontSize: 14,
                  color: "#1a1a1a",
                  lineHeight: "1.5",
                }}
              >
                {descripcion || "Sin descripción"}
              </p>
            </div>

            <div
              style={{
                backgroundColor: fecha && hora ? "#E8F4E8" : "#F5F5F5",
                padding: "12px",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontSize: 12,
                  color: fecha && hora ? "#2d8a2d" : "#888",
                }}
              >
                {fecha && hora
                  ? "✓ Listo para agendar"
                  : "⚠️ Completa todos los campos"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}