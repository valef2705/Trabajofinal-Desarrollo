import React, { useState, useEffect } from 'react';

function Formulario({ especialidades, medicos, agregarTurno, turnoEditable }) {
  const [especialidad, setEspecialidad] = useState('');
  const [profesional, setProfesional] = useState('');
  const [nombrePaciente, setNombrePaciente] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');

  useEffect(() => {
    if (turnoEditable) {
      setEspecialidad(turnoEditable.especialidad);
      setProfesional(turnoEditable.profesional);
      setNombrePaciente(turnoEditable.nombrePaciente);
      setFecha(turnoEditable.fecha);
      setHora(turnoEditable.hora || '');
    } else {
      setEspecialidad('');
      setProfesional('');
      setNombrePaciente('');
      setFecha('');
      setHora('');
    }
  }, [turnoEditable]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (especialidad && profesional && nombrePaciente && fecha && hora) {
      const nuevoTurno = {
        especialidad,
        profesional,
        nombrePaciente,
        fecha,
        hora
      };

      agregarTurno(nuevoTurno);

      setEspecialidad('');
      setProfesional('');
      setNombrePaciente('');
      setFecha('');
      setHora('');
    } else {
      alert('Por favor completá todos los campos.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <label className="form-label">Especialidad:</label>
        <select
          className="form-select"
          value={especialidad}
          onChange={(e) => setEspecialidad(e.target.value)}
        >
          <option value="">Seleccione una especialidad</option>
          {especialidades.map((esp) => (
            <option key={esp} value={esp}>{esp}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Profesional:</label>
        <select
          className="form-select"
          value={profesional}
          onChange={(e) => setProfesional(e.target.value)}
          disabled={!especialidad}
        >
          <option value="">Seleccione un profesional</option>
          {especialidad && medicos[especialidad].map((med) => (
            <option key={med} value={med}>{med}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Nombre del Paciente:</label>
        <input
          type="text"
          className="form-control"
          value={nombrePaciente}
          onChange={(e) => setNombrePaciente(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Fecha:</label>
        <input
          type="date"
          className="form-control"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Hora:</label>
        <select
          className="form-select"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
        >
          <option value="">Seleccione una hora</option>
          {[...Array(24).keys()].map((h) => (
            <option key={h} value={h}>{h}:00</option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        {turnoEditable ? 'Actualizar Turno' : 'Agregar Turno'}
      </button>
    </form>
  );
}

export default Formulario;
