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

  const enviarDatos = (e) => {
    e.preventDefault();
    
    // VALIDACIÓN DE RESPUESTAS
    const { nombre, movil, email, escuela, carrera } = datos;
    if (!nombre || !movil || !email || !escuela || !carrera) {
      alert("Error: Todos los campos son obligatorios.");
      return;
    }

    if (movil.length < 10) {
      alert("El número de teléfono debe tener al menos 10 dígitos.");
      return;
    }

    console.log("Enviando a PHP...", datos);
    alert("¡Información validada y guardada con éxito!");
  };

  return (
    <div className="contenedor-principal">
      {/* Logos superiores solo visibles en el formulario si gustas */}
      {iniciado && (
        <>
          <img src="https://scontent-dfw5-2.xx.fbcdn.net/v/t39.30808-6/472781941_594669726543962_2814276430072555941_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeHz-rR2MIN2XK87fK1zX0BZsn7XwdG3-n6yftfB0bf6fi4yoSLB66AN0vZbL9nQxgN4RJc2X0IAJI3zlYFv1OAv&_nc_ohc=9R3eA113Sz4Q7kNvwH4Ai8X&_nc_oc=AdlJ8zWwhQlRbk-MGKCcfIIw85UQ2n5UIKNbElJYFUXGlm3fNL4O92eWg8L5f92fvuoFR4B-KE22Vbn3S5PJr3yR&_nc_zt=23&_nc_ht=scontent-dfw5-2.xx&_nc_gid=FpyZhIwhQLjqTHaxGAbkeQ&_nc_ss=8&oh=00_AfxUA8g9teWw6wqzM9Bd01GT0PxARDlJPNBTwd0iIr-2AA&oe=69B89FA6" alt="Logo Izq" className="logo-esquina izq" />
          <img src="https://scontent-dfw5-2.xx.fbcdn.net/v/t39.30808-6/472781941_594669726543962_2814276430072555941_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeHz-rR2MIN2XK87fK1zX0BZsn7XwdG3-n6yftfB0bf6fi4yoSLB66AN0vZbL9nQxgN4RJc2X0IAJI3zlYFv1OAv&_nc_ohc=9R3eA113Sz4Q7kNvwH4Ai8X&_nc_oc=AdlJ8zWwhQlRbk-MGKCcfIIw85UQ2n5UIKNbElJYFUXGlm3fNL4O92eWg8L5f92fvuoFR4B-KE22Vbn3S5PJr3yR&_nc_zt=23&_nc_ht=scontent-dfw5-2.xx&_nc_gid=FpyZhIwhQLjqTHaxGAbkeQ&_nc_ss=8&oh=00_AfxUA8g9teWw6wqzM9Bd01GT0PxARDlJPNBTwd0iIr-2AA&oe=69B89FA6" alt="Logo Der" className="logo-esquina der" />
        </>
      )}

      <div className="card">
        {!iniciado ? (
          <div className="menu-inicio">
            <img src="https://www.utzac.edu.mx/wp-content/uploads/2018/05/logo-nuevo.png" alt="Logo Uni" style={{width: '100px'}} />
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