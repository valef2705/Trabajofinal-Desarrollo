const express = require('express');
const router = express.Router();
const Turno = require('../models/Turno');

// Obtener todos los turnos
router.get('/', async (req, res) => {
  try {
    const turnos = await Turno.find();
    res.json(turnos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los turnos', error });
  }
});

// Crear un nuevo turno
router.post('/', async (req, res) => {
  try {
    const nuevoTurno = new Turno(req.body);
    const turnoGuardado = await nuevoTurno.save();
    res.status(201).json(turnoGuardado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear el turno', error });
  }
});

// Confirmar un turno
router.put('/:id/confirmar', async (req, res) => {
  try {
    const turno = await Turno.findByIdAndUpdate(req.params.id, { estado: 'confirmado' }, { new: true });
    res.json(turno);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al confirmar el turno', error });
  }
});

// Cancelar un turno
router.put('/:id/cancelar', async (req, res) => {
  try {
    const turno = await Turno.findByIdAndUpdate(req.params.id, { estado: 'cancelado' }, { new: true });
    res.json(turno);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al cancelar el turno', error });
  }
});

// Eliminar un turno
router.delete('/:id', async (req, res) => {
  try {
    await Turno.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Turno eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el turno', error });
  }
});

module.exports = router;
