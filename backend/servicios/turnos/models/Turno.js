const mongoose = require('mongoose');

const turnoSchema = new mongoose.Schema({
  nombrePaciente: { type: String, required: true },
  especialidad: { type: String, required: true },
  profesional: { type: String, required: true },
  fecha: { type: String, required: true },
  hora: { type: String, required: true },
  estado: {
    type: String,
    enum: ['pendiente', 'confirmado', 'cancelado'],
    default: 'pendiente'
  }
});

module.exports = mongoose.model('Turno', turnoSchema);
