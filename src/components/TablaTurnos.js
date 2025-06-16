import React from 'react';
import axios from 'axios';

function TablaTurnos({ turnos, editarTurno, eliminarTurno, setTurnos, modoProfesional = false }) {
  const cambiarEstado = (id, nuevoEstado) => {
    axios
      .put(`http://localhost:4001/api/turnos/${id}`, { estado: nuevoEstado })
      .then((res) => {
        setTurnos((prevTurnos) =>
          prevTurnos.map((t) => (t._id === id ? res.data : t))
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
          <th>Profesional</th>
          <th>Paciente</th>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {turnos.map((turno, index) => (
          <tr key={turno._id || index}>
            <td>{turno.especialidad}</td>
            <td>{turno.profesional}</td>
            <td>{turno.nombrePaciente}</td>
            <td>{turno.fecha}</td>
            <td>{turno.hora}:00</td>
            <td>{turno.estado || 'pendiente'}</td>
            <td>
              {modoProfesional ? (
                <>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => cambiarEstado(turno._id, 'confirmado')}
                  >
                    Confirmar
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => cambiarEstado(turno._id, 'cancelado')}
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => editarTurno(index)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => eliminarTurno(index)}
                  >
                    Eliminar
                  </button>
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
