import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Formulario from './components/Formulario';
import TablaTurnos from './components/TablaTurnos';

const especialidades = [
  'Gastroenterologia', 'Cardiologia', 'Dermatologia',
  'Clinica Medica', 'Oftalmologia', 'Neumonologia'
];

const medicos = {
  Gastroenterologia: ['Dr. Aguilar Marcelo', 'Dra. Perez Maria'],
  Cardiologia: ['Dr. Eduardo Pino', 'Dra. Lopez Ana'],
  Dermatologia: ['Dr. Gonzalez Juan', 'Dra. Martinez Laura'],
  'Clinica Medica': ['Dr. Hernandez Jose', 'Dra. Fernandez Paula'],
  Oftalmologia: ['Dr. Diaz Carlos', 'Dra. Alvarez Lucia'],
  Neumonologia: ['Dr. Ramirez Luis', 'Dra. Gutierrez Sofia'],
};

function App() {
  const [turnos, setTurnos] = useState([]);
  const [turnoEditable, setTurnoEditable] = useState(null);
  const [rol, setRol] = useState('');
  const [profesionalActivo, setProfesionalActivo] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/api/turnos')
      .then(res => {
        setTurnos(res.data);
      })
      .catch(err => {
        console.error('Error al cargar los turnos desde el backend:', err);
      });
  }, []);

  const agregarTurno = (nuevoTurno) => {
    if (turnoEditable !== null) {
      const turnosActualizados = turnos.map((turno, index) =>
        index === turnoEditable ? nuevoTurno : turno
      );
      setTurnos(turnosActualizados);
      setTurnoEditable(null);
    } else {
      axios.post('http://localhost:3001/api/turnos', nuevoTurno)
        .then((res) => {
          setTurnos([...turnos, res.data]);
        })
        .catch((err) => {
          console.error('Error al guardar el turno en el backend:', err);
        });
    }
  };

  const editarTurno = (index) => {
    setTurnoEditable(index);
  };

  const eliminarTurno = (index) => {
    const turnoAEliminar = turnos[index];
    axios.delete(`http://localhost:3001/api/turnos/${turnoAEliminar.id}`)
      .then(() => {
        const turnosActualizados = turnos.filter((_, i) => i !== index);
        setTurnos(turnosActualizados);
      })
      .catch((err) => {
        console.error('Error al eliminar el turno del backend:', err);
      });
  };

  const cambiarRol = () => {
    setRol('');
    setProfesionalActivo('');
  };

  return (
    <div className="App container">
      <h1 className="text-center my-4">Turnero Médico</h1>

      {!rol ? (
        <div className="text-center my-4">
          <h3>Seleccioná tu rol</h3>
          <button className="btn btn-primary m-2" onClick={() => setRol('paciente')}>Paciente</button>
          <button className="btn btn-secondary m-2" onClick={() => setRol('profesional')}>Profesional</button>
        </div>
      ) : rol === 'paciente' ? (
        <>
          <Formulario
            especialidades={especialidades}
            medicos={medicos}
            agregarTurno={agregarTurno}
            turnoEditable={turnoEditable !== null ? turnos[turnoEditable] : null}
          />
          <TablaTurnos
            turnos={turnos}
            editarTurno={editarTurno}
            eliminarTurno={eliminarTurno}
            setTurnos={setTurnos}
          />
        </>
      ) : (
        <>
          <h4>Mis Turnos (Profesional)</h4>

          <div className="mb-3">
            <label className="form-label">Seleccioná tu nombre:</label>
            <select
              className="form-select"
              value={profesionalActivo}
              onChange={(e) => setProfesionalActivo(e.target.value)}
            >
              <option value="">Seleccionar profesional</option>
              {Object.values(medicos).flat().map((med, i) => (
                <option key={i} value={med}>{med}</option>
              ))}
            </select>
          </div>

          {profesionalActivo && (
            <TablaTurnos
              turnos={turnos.filter(turno => turno.medico === profesionalActivo)}
              editarTurno={editarTurno}
              eliminarTurno={eliminarTurno}
              setTurnos={setTurnos}
              modoProfesional
            />
          )}
        </>
      )}

      {rol && (
        <div className="text-center mt-4">
          <button className="btn btn-outline-danger" onClick={cambiarRol}>
            Cambiar de rol
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
