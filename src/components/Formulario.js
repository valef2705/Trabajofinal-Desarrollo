import React, { useState, useEffect } from 'react';

function Formulario({ especialidades, medicos, agregarTurno, turnoEditable }) {
  const [especialidad, setEspecialidad] = useState('');
  const [medico, setMedico] = useState('');
  const [paciente, setPaciente] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');

  useEffect(() => {
    if (turnoEditable) {
      setEspecialidad(turnoEditable.especialidad);
      setMedico(turnoEditable.medico);
      setPaciente(turnoEditable.paciente);
      setFecha(turnoEditable.fecha);
      setHora(turnoEditable.hora);
    } else {
      setEspecialidad('');
      setMedico('');
      setPaciente('');
      setFecha('');
      setHora('');
    }
  }, [turnoEditable]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (especialidad && medico && paciente && fecha && hora) {
      agregarTurno({ especialidad, medico, paciente, fecha, hora });

      if (!turnoEditable) {
        setEspecialidad('');
        setMedico('');
        setPaciente('');
        setFecha('');
        setHora('');
      }
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
        <label className="form-label">Médico:</label>
        <select
          className="form-select"
          value={medico}
          onChange={(e) => setMedico(e.target.value)}
          disabled={!especialidad}
        >
          <option value="">Seleccione un médico</option>
          {especialidad && medicos[especialidad].map((med) => (
            <option key={med} value={med}>{med}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Paciente:</label>
        <input
          type="text"
          className="form-control"
          value={paciente}
          onChange={(e) => setPaciente(e.target.value)}
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
          <option value="">Seleccione un horario</option>
          <option value="9">9:00</option>
          <option value="11">11:00</option>
          <option value="12">12:00</option>
          <option value="15">15:00</option>
          <option value="16">16:00</option>
          <option value="17">17:00</option>
          <option value="18">18:00</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        {turnoEditable ? 'Aceptar' : 'Agregar'}
      </button>
    </form>
  );
}

export default Formulario;
