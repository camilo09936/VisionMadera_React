import { useState } from "react";

export default function Home() {

    const [seccionActiva, setSeccionActiva] = useState("inicio");
    const [cardHover, setCardHover] = useState(null);
    const nombreUsuario = localStorage.getItem("nombreUsuario") || "Usuario";

    return (
        <div style={{ fontFamily: "Poppins, sans-serif", backgroundColor: "#FAFAF9", minHeight: "100vh" }}>

            {/* Barra de navegacion */}
            <nav style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 48px",
                height: 60,
                backgroundColor: "#fff",
                borderBottom: "1px solid #eee"
            }}>

                <span style={{ fontWeight: 700, color: "#E8580A", fontSize: 18 }}>
                    VisiónMadera
                </span>

                <div style={{ display: "flex", gap: 28 }}>
                    <span
                        onClick={() => setSeccionActiva("inicio")}
                        style={{
                            cursor: "pointer", fontSize: 14,
                            color: seccionActiva === "inicio" ? "#E8580A" : "#555",
                            fontWeight: seccionActiva === "inicio" ? 600 : 400
                        }}>
                        Inicio
                    </span>
                    <span
                        onClick={() => setSeccionActiva("agendar")}
                        style={{
                            cursor: "pointer", fontSize: 14,
                            color: seccionActiva === "agendar" ? "#E8580A" : "#555",
                            fontWeight: seccionActiva === "agendar" ? 600 : 400
                        }}>
                        Agendar cita
                    </span>
                    <span
                        onClick={() => setSeccionActiva("citas")}
                        style={{
                            cursor: "pointer", fontSize: 14,
                            color: seccionActiva === "citas" ? "#E8580A" : "#555",
                            fontWeight: seccionActiva === "citas" ? 600 : 400
                        }}>
                        Mis citas
                    </span>
                    <span
                        onClick={() => setSeccionActiva("pqrs")}
                        style={{
                            cursor: "pointer", fontSize: 14,
                            color: seccionActiva === "pqrs" ? "#E8580A" : "#555",
                            fontWeight: seccionActiva === "pqrs" ? 600 : 400
                        }}>
                        PQRS
                    </span>
                </div>

            </nav>

            {/* Seccion de nombre de ususario */}
            <section style={{
                backgroundColor: "#FDF0E8",
                padding: "48px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>

                <div>
                    <h1 style={{ fontSize: 26, fontWeight: 600, marginBottom: 8, color: "#1a1a1a" }}>
                        Hola, {nombreUsuario}
                    </h1>
                    <p style={{ color: "#666", marginBottom: 24, fontSize: 14 }}>
                        Gestiona tus citas de diseño en Madecentro
                    </p>
                    <button
                        onClick={() => alert("¡Ir a agendar cita!")}
                        style={{
                            backgroundColor: "#E8580A",
                            color: "#fff",
                            border: "none",
                            borderRadius: 8,
                            padding: "10px 22px",
                            fontSize: 14,
                            fontWeight: 500,
                            cursor: "pointer"
                        }}>
                        + Agendar nueva cita
                    </button>
                </div>

                <div style={{ display: "flex", gap: 12 }}>
                    <div style={{
                        backgroundColor: "#fff",
                        borderRadius: 12,
                        padding: "16px 24px",
                        border: "1px solid rgba(232,88,10,0.2)",
                        textAlign: "center"
                    }}>
                        <div style={{ fontSize: 26, fontWeight: 600, color: "#E8580A" }}>2</div>
                        <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>Citas activas</div>
                    </div>
                    <div style={{
                        backgroundColor: "#fff",
                        borderRadius: 12,
                        padding: "16px 24px",
                        border: "1px solid rgba(232,88,10,0.2)",
                        textAlign: "center"
                    }}>
                        <div style={{ fontSize: 26, fontWeight: 600, color: "#E8580A" }}>5</div>
                        <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>Citas realizadas</div>
                    </div>
                </div>

            </section>

            {/* Botones de citas , pqrs , etc  */}
            <section style={{ padding: "32px 48px" }}>

                <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16, color: "#1a1a1a" }}>
                    Acciones rápidas
                </h2>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 36 }}>

                    <div
                        onClick={() => alert("Agendar cita")}
                        onMouseEnter={() => setCardHover("agendar")}
                        onMouseLeave={() => setCardHover(null)}
                        style={{
                            backgroundColor: "#fff",
                            border: cardHover === "agendar" ? "1px solid #E8580A" : "1px solid #eee",
                            borderRadius: 12,
                            padding: "20px 18px",
                            cursor: "pointer",
                            transform: cardHover === "agendar" ? "translateY(-3px)" : "translateY(0)",
                            transition: "all 0.2s"
                        }}>
                        <div style={{
                            width: 38, height: 38, borderRadius: 8, backgroundColor: "#FDF0E8",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            marginBottom: 12, fontSize: 20
                        }}>📅</div>
                        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 3 }}>Agendar cita</div>
                        <div style={{ fontSize: 12, color: "#888" }}>Elige fecha, hora y sede</div>
                    </div>

                    <div
                        onClick={() => alert("Reprogramar")}
                        onMouseEnter={() => setCardHover("reprogramar")}
                        onMouseLeave={() => setCardHover(null)}
                        style={{
                            backgroundColor: "#fff",
                            border: cardHover === "reprogramar" ? "1px solid #E8580A" : "1px solid #eee",
                            borderRadius: 12,
                            padding: "20px 18px",
                            cursor: "pointer",
                            transform: cardHover === "reprogramar" ? "translateY(-3px)" : "translateY(0)",
                            transition: "all 0.2s"
                        }}>
                        <div style={{
                            width: 38, height: 38, borderRadius: 8, backgroundColor: "#FDF0E8",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            marginBottom: 12, fontSize: 20
                        }}>✏️</div>
                        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 3 }}>Reprogramar</div>
                        <div style={{ fontSize: 12, color: "#888" }}>Cambia fecha u hora</div>
                    </div>

                    <div
                        onClick={() => alert("Cancelar cita")}
                        onMouseEnter={() => setCardHover("cancelar")}
                        onMouseLeave={() => setCardHover(null)}
                        style={{
                            backgroundColor: "#fff",
                            border: cardHover === "cancelar" ? "1px solid #E8580A" : "1px solid #eee",
                            borderRadius: 12,
                            padding: "20px 18px",
                            cursor: "pointer",
                            transform: cardHover === "cancelar" ? "translateY(-3px)" : "translateY(0)",
                            transition: "all 0.2s"
                        }}>
                        <div style={{
                            width: 38, height: 38, borderRadius: 8, backgroundColor: "#FDF0E8",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            marginBottom: 12, fontSize: 20
                        }}>❌</div>
                        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 3 }}>Cancelar cita</div>
                        <div style={{ fontSize: 12, color: "#888" }}>Cancela cuando necesites</div>
                    </div>

                    <div
                        onClick={() => alert("PQRS")}
                        onMouseEnter={() => setCardHover("pqrs")}
                        onMouseLeave={() => setCardHover(null)}
                        style={{
                            backgroundColor: "#fff",
                            border: cardHover === "pqrs" ? "1px solid #E8580A" : "1px solid #eee",
                            borderRadius: 12,
                            padding: "20px 18px",
                            cursor: "pointer",
                            transform: cardHover === "pqrs" ? "translateY(-3px)" : "translateY(0)",
                            transition: "all 0.2s"
                        }}>
                        <div style={{
                            width: 38, height: 38, borderRadius: 8, backgroundColor: "#FDF0E8",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            marginBottom: 12, fontSize: 20
                        }}>💬</div>
                        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 3 }}>PQRS</div>
                        <div style={{ fontSize: 12, color: "#888" }}>Soporte y solicitudes</div>
                    </div>

                </div>

                {/* Próximas citas */}
                <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16, color: "#1a1a1a" }}>
                    Próximas citas
                </h2>

                {[
                    {
                        id: 1, dia: "14", mes: "ABR", titulo: "Asesoría de diseño",
                        hora: "10:00 AM", sede: "Chagualo", estado: "confirmada"
                    },
                    {
                        id: 2, dia: "22", mes: "ABR", titulo: "Asesoría de diseño",
                        hora: "2:30 PM", sede: "Palace", estado: "pendiente"
                    },
                ].map((cita) => (
                    <div key={cita.id} style={{
                        display: "flex", alignItems: "center", gap: 16,
                        padding: "16px 0", borderBottom: "1px solid #f0f0f0"
                    }}>

                        <div style={{
                            width: 50, height: 50, borderRadius: 10, backgroundColor: "#FDF0E8",
                            display: "flex", flexDirection: "column",
                            alignItems: "center", justifyContent: "center", flexShrink: 0
                        }}>
                            <span style={{ fontSize: 18, fontWeight: 700, color: "#E8580A", lineHeight: 1 }}>
                                {cita.dia}
                            </span>
                            <span style={{ fontSize: 10, color: "#E8580A" }}>{cita.mes}</span>
                        </div>

                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 500, fontSize: 14 }}>{cita.titulo}</div>
                            <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>
                                {cita.hora} · {cita.sede}
                            </div>
                        </div>

                        <span style={{
                            padding: "3px 12px", borderRadius: 20, fontSize: 11, fontWeight: 600,
                            backgroundColor: cita.estado === "confirmada" ? "#EAF3DE" : "#FDF0E8",
                            color: cita.estado === "confirmada" ? "#27500A" : "#633806"
                        }}>
                            {cita.estado === "confirmada" ? "Confirmada" : "Pendiente"}
                        </span>

                    </div>
                ))}

            </section>

        </div>
    );
}