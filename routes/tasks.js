const express = require('express');
const router = express.Router();
const taskModel = require('../models/Task.js');

// Crear una tarea
router.post('/create', async (req, res) => {
  try {
    const task = await taskModel.create({ ...req.body, completed: false });
    res.status(201).json(task); // Devolver la tarea recién creada
  } catch (error) {
    console.error('There was a problem trying to create a task', error);
    res.status(500).json({ error: 'There was a problem trying to create a task' });
  }
});

// Obtener todas las tareas
router.get('/', async (req, res) => {
  try {
    const tasks = await taskModel.find();
    res.status(200).json(tasks); // Devuelve todas las tareas
  } catch (error) {
    console.error('There was a problem trying to get all task', error);
    res.status(500).json({ error: 'There was a problem trying to get all task' });
  }
});

// Obtener tarea por id
router.get('/id/:_id', async (req, res) => {
  try {
    const id = req.params._id;
    const task = await taskModel.findById(id);
    if (!task) {
      return res.status(404).json({ mensaje: 'La tarea no ha sido encontrada' });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error('Error al obtener la tarea', error);
    res.status(500).json({ error: 'Error al obtener la tarea' });
  }
});

// Marcar tarea como completada
router.put('/markAsCompleted/:_id', async (req, res) => {
  try {
    const task = await taskModel.findByIdAndUpdate(
      req.params._id,
      { completed: true },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar la tarea' });
  }
});

// Actualizar el título de una tarea
router.put('/id/:_id', async (req, res) => {
  try {
    const { title } = req.body;
    const task = await taskModel.findByIdAndUpdate(
      req.params._id,
      { title },
      { new: true, runValidators: true }
    );
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ error: 'Error al actualizar la tarea' });
  }
});

// Eliminar una tarea
router.delete('/id/:_id', async (req, res) => {
  try {
    const task = await taskModel.findByIdAndDelete(req.params._id);
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.status(200).json({ message: 'Tarea eliminada' });
  } catch (err) {
    res.status(400).json({ error: 'Error al eliminar la tarea' });
  }
});

module.exports = router;
