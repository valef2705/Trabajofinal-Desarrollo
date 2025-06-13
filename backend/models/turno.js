const mongoose = require('mongoose');

const turnoSchema = new mongoose.Schema({
  especialidad: String,
  medico: String,
  paciente: String,
  fecha: String,
  hora: String,
  estado: {
    type: String,
    default: 'pendiente'
  }
});

module.exports = mongoose.model('Turno', turnoSchema);
