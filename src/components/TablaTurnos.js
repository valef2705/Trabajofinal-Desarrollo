import React from 'react';
import axios from 'axios';

function TablaTurnos({ turnos, editarTurno, eliminarTurno, setTurnos, modoProfesional = false }) {
  const cambiarEstado = (turno, nuevoEstado) => {
    const turnoActualizado = { ...turno, estado: nuevoEstado };

    axios.put(`http://localhost:3001/api/turnos/${turno.id}`, turnoActualizado)
      .then(() => {
        setTurnos(prev =>
          prev.map(t => (t.id === turno.id ? { ...t, estado: nuevoEstado } : t))
        );
      })
      .catch((err) => {
        console.error('Error al cambiar estado del turno:', err);
      });
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Especialidad</th>
          <th>Médico</th>
          <th>Paciente</th>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {turnos.map((turno, index) => (
          <tr key={index}>
            <td>{turno.especialidad}</td>
            <td>{turno.medico}</td>
            <td>{turno.paciente}</td>
            <td>{turno.fecha}</td>
            <td>{turno.hora}:00</td>
            <td>{turno.estado || 'pendiente'}</td>
            <td>
              {modoProfesional ? (
                <>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => cambiarEstado(turno, 'confirmado')}
                  >
                    Confirmar
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => cambiarEstado(turno, 'cancelado')}
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <button className="btn btn-warning me-2" onClick={() => editarTurno(index)}>Editar</button>
                  <button className="btn btn-danger" onClick={() => eliminarTurno(index)}>Eliminar</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TablaTurnos;
