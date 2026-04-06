import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export default function Home() {
  const [seccionActiva, setSeccionActiva] = useState("inicio");
  const [cardHover, setCardHover] = useState(null);
  const [citas, setCitas] = useState([]);
  const nombreUsuario = localStorage.getItem("nombreUsuario") || "Usuario";
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/citas`)
      .then((response) => response.json())
      .then((data) => setCitas(data))
      .catch((error) => console.error("Error cargando citas:", error));
  }, []);

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        backgroundColor: "#FAFAF9",
        minHeight: "100vh",
      }}
    >
      {/* Barra de navegacion */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 48px",
          height: 60,
          backgroundColor: "#fff",
          borderBottom: "1px solid #eee",
        }}
      >
        <span style={{ fontWeight: 700, color: "#E8580A", fontSize: 18 }}>
          VisiónMadera
        </span>

        <div style={{ display: "flex", gap: 28 }}>
          <span
            onClick={() => setSeccionActiva("inicio")}
            style={{
              cursor: "pointer",
              fontSize: 14,
              color: seccionActiva === "inicio" ? "#E8580A" : "#555",
              fontWeight: seccionActiva === "inicio" ? 600 : 400,
            }}
          >
            Inicio
          </span>
          <span
            onClick={() => setSeccionActiva("agendar")}
            style={{
              cursor: "pointer",
              fontSize: 14,
              color: seccionActiva === "agendar" ? "#E8580A" : "#555",
              fontWeight: seccionActiva === "agendar" ? 600 : 400,
            }}
          >
            Agendar cita
          </span>
          <span
            onClick={() => setSeccionActiva("citas")}
            style={{
              cursor: "pointer",
              fontSize: 14,
              color: seccionActiva === "citas" ? "#E8580A" : "#555",
              fontWeight: seccionActiva === "citas" ? 600 : 400,
            }}
          >
            Mis citas
          </span>
          <span
            onClick={() => setSeccionActiva("pqrs")}
            style={{
              cursor: "pointer",
              fontSize: 14,
              color: seccionActiva === "pqrs" ? "#E8580A" : "#555",
              fontWeight: seccionActiva === "pqrs" ? 600 : 400,
            }}
          >
            PQRS
          </span>
        </div>
      </nav>

      {/* Seccion de nombre de ususario */}
      <section
        style={{
          backgroundColor: "#FDF0E8",
          padding: "48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 26,
              fontWeight: 600,
              marginBottom: 8,
              color: "#1a1a1a",
            }}
          >
            Hola, {nombreUsuario}
          </h1>
          <p style={{ color: "#666", marginBottom: 24, fontSize: 14 }}>
            Gestiona tus citas de diseño en Madecentro
          </p>
          <button
            onClick={() => navigate("/agendar-cita")}
            style={{
              backgroundColor: "#E8580A",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "10px 22px",
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            + Agendar nueva cita
          </button>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: "16px 24px",
              border: "1px solid rgba(232,88,10,0.2)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 26, fontWeight: 600, color: "#E8580A" }}>
              {citas.length}
            </div>
            <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>
              Citas activas
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: "16px 24px",
              border: "1px solid rgba(232,88,10,0.2)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 26, fontWeight: 600, color: "#E8580A" }}>
              {citas.length}
            </div>
            <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>
              Citas realizadas
            </div>
          </div>
        </div>
      </section>

      {/* Botones de citas , pqrs , etc  */}
      <section style={{ padding: "32px 48px" }}>
        <h2
          style={{
            fontSize: 15,
            fontWeight: 600,
            marginBottom: 16,
            color: "#1a1a1a",
          }}
        >
          Acciones rápidas
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 14,
            marginBottom: 36,
          }}
        >
          <div
            onClick={() => navigate("/agendar-cita")}
            onMouseEnter={() => setCardHover("agendar")}
            onMouseLeave={() => setCardHover(null)}
            style={{
              backgroundColor: "#fff",
              border:
                cardHover === "agendar"
                  ? "1px solid #E8580A"
                  : "1px solid #eee",
              borderRadius: 12,
              padding: "20px 18px",
              cursor: "pointer",
              transform:
                cardHover === "agendar" ? "translateY(-3px)" : "translateY(0)",
              transition: "all 0.2s",
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 8,
                backgroundColor: "#FDF0E8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 12,
                fontSize: 20,
              }}
            >
              📅
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 3 }}>
              Agendar cita
            </div>
            <div style={{ fontSize: 12, color: "#888" }}>
              Elige fecha, hora y sede
            </div>
          </div>

          <div
            onClick={() => navigate("/reprogramar-cita")}
            onMouseEnter={() => setCardHover("reprogramar")}
            onMouseLeave={() => setCardHover(null)}
            style={{
              backgroundColor: "#fff",
              border:
                cardHover === "reprogramar"
                  ? "1px solid #E8580A"
                  : "1px solid #eee",
              borderRadius: 12,
              padding: "20px 18px",
              cursor: "pointer",
              transform:
                cardHover === "reprogramar"
                  ? "translateY(-3px)"
                  : "translateY(0)",
              transition: "all 0.2s",
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 8,
                backgroundColor: "#FDF0E8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 12,
                fontSize: 20,
              }}
            >
              ✏️
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 3 }}>
              Reprogramar
            </div>
            <div style={{ fontSize: 12, color: "#888" }}>
              Cambia fecha u hora
            </div>
          </div>

          <div
            onClick={() => navigate("/cancelar-cita")}
            onMouseEnter={() => setCardHover("cancelar")}
            onMouseLeave={() => setCardHover(null)}
            style={{
              backgroundColor: "#fff",
              border:
                cardHover === "cancelar"
                  ? "1px solid #E8580A"
                  : "1px solid #eee",
              borderRadius: 12,
              padding: "20px 18px",
              cursor: "pointer",
              transform:
                cardHover === "cancelar" ? "translateY(-3px)" : "translateY(0)",
              transition: "all 0.2s",
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 8,
                backgroundColor: "#FDF0E8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 12,
                fontSize: 20,
              }}
            >
              ❌
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 3 }}>
              Cancelar cita
            </div>
            <div style={{ fontSize: 12, color: "#888" }}>
              Cancela cuando necesites
            </div>
          </div>

          <div
            onClick={() => alert("PQRS")}
            onMouseEnter={() => setCardHover("pqrs")}
            onMouseLeave={() => setCardHover(null)}
            style={{
              backgroundColor: "#fff",
              border:
                cardHover === "pqrs" ? "1px solid #E8580A" : "1px solid #eee",
              borderRadius: 12,
              padding: "20px 18px",
              cursor: "pointer",
              transform:
                cardHover === "pqrs" ? "translateY(-3px)" : "translateY(0)",
              transition: "all 0.2s",
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 8,
                backgroundColor: "#FDF0E8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 12,
                fontSize: 20,
              }}
            >
              💬
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 3 }}>
              PQRS
            </div>
            <div style={{ fontSize: 12, color: "#888" }}>
              Soporte y solicitudes
            </div>
          </div>
        </div>

        {/* Próximas citas */}
        <h2 style={{ marginBottom: "15px" }}>Próximas citas</h2>

  {citas.length === 0 ? (
    <p style={{ color: "#888" }}>
      No tienes citas agendadas 📅
    </p>
  ) : (
    citas.map((cita) => (
      <div
        key={cita.id}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "16px 0",
          borderBottom: "1px solid #eee",
        }}
      >
        {/* FECHA */}
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: 10,
            backgroundColor: "#FDE6D8",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontWeight: "700", color: "#E8580A" }}>
            {cita.fecha.split("-")[2]}
          </span>
          <span style={{ fontSize: 12, color: "#E8580A" }}>
            {new Date(cita.fecha).toLocaleString("es-ES", {
              month: "short",
            }).toUpperCase()}
          </span>
        </div>

        {/* INFO */}
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600 }}>
            {cita.descripcion || "Cita"}
          </div>
          <div style={{ fontSize: 12, color: "#888" }}>
            {cita.hora}
          </div>
        </div>
      </div>
    ))
  )}
      </section>
    </div>
  );
}
