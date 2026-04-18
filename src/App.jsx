import React, { useState } from 'react';
import './App.css';

function App() {
  const [iniciado, setIniciado] = useState(false);
  const [datos, setDatos] = useState({
    nombre: '',
    movil: '',
    email: '',
    escuela: '',
    carrera: ''
  });

  const handleInputChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const enviarDatos = async (e) => {
    e.preventDefault();
    
    // 1. VALIDACIÓN DE RESPUESTAS
    const { nombre, movil, email, escuela, carrera } = datos;
    if (!nombre || !movil || !email || !escuela || !carrera) {
      alert("Error: Todos los campos son obligatorios.");
      return;
    }

    if (movil.length < 10) {
      alert("El número de teléfono debe tener al menos 10 dígitos.");
      return;
    }

    try {
      // 2. ENVÍO REAL A VERCEL POSTGRES
      const respuesta = await fetch('/api/registrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos),
      });

      if (respuesta.ok) {
        alert("¡Información guardada en la base de datos con éxito!");
        // Opcional: Reiniciar el formulario y volver al inicio
        setIniciado(false);
        setDatos({ nombre: '', movil: '', email: '', escuela: '', carrera: '' });
      } else {
        const errorData = await respuesta.json();
        alert("Error al guardar: " + (errorData.error || "Error desconocido"));
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("No se pudo conectar con el servidor. Verifica tu conexión.");
    }
  };

  return (
    <div className="contenedor-principal">
      {/* Logos superiores */}
      {iniciado && (
        <>
          <img src="public/logo.jpg" alt="Logo Izq" className="logo-esquina izq" />
          <img src="public/logo.jpg" alt="Logo Der" className="logo-esquina der" />
        </>
      )}

      <div className="card">
        {!iniciado ? (
          <div className="menu-inicio">
            <img src="public/fondo.jpg" alt="Logo Uni" style={{width: '100px'}} />
            <h1 className="titulo">Bienvenido</h1>
            <p>Sistema de Pre-registro Universitario</p>
            <button className="btn-accion" onClick={() => setIniciado(true)}>
              Iniciar Registro
            </button>
          </div>
        ) : (
          <form onSubmit={enviarDatos}>
            <h2 className="titulo">Registro de Aspirantes</h2>
            
            <label>Nombre Completo</label>
            <input className="input-estilo" name="nombre" placeholder="Escribe tu nombre" onChange={handleInputChange} required />
            
            <label>Número de Teléfono</label>
            <input className="input-estilo" name="movil" type="tel" placeholder="492-XXX-XXXX" onChange={handleInputChange} required />
            
            <label>Correo Electrónico</label>
            <input className="input-estilo" name="email" type="email" placeholder="ejemplo@correo.com" onChange={handleInputChange} required />
            
            <label>Escuela de Procedencia</label>
            <select className="input-estilo" name="escuela" onChange={handleInputChange} required>
              <option value="">-- Selecciona --</option>
              <option value="Prepa 1">Preparatoria 1</option>
              <option value="COBAEZ">COBAEZ Plantel 01</option>
              <option value="Prepa 2">Preparatoria 2</option>
              <option value="poli">el poli</option>
              <option value="Prepa 4">Preparatoria 4</option>
              <option value="Prepa poli">Preparatoria policial</option>
            </select>

            <label>Carrera de Interés</label>
            <select className="input-estilo" name="carrera" onChange={handleInputChange} required>
              <option value="">-- Selecciona --</option>
              <option value="TI">Ingeniería en Tecnologias de la informacion</option>
              <option value="Agri">Agricultura</option>
              <option value="Fisio">Fisioterapia</option>
              <option value="Mineria">Minería</option>
            </select>

            <button type="submit" className="btn-accion">GUARDAR INFORMACIÓN</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;