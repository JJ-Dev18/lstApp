import { Request, Response } from "express";
import { actualizarPlanillero, createPlanillero, eliminarPlanillero, obtenerPlanillero, obtenerPlanilleros, obtenerPlanillerosPorTorneo } from "../controllers/planilleroController";

const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Crear un planillero
router.post('/:torneoId', createPlanillero);

// Obtener todos los planilleros
router.get('/:torneoId', obtenerPlanillerosPorTorneo);
router.get('/', obtenerPlanilleros);
router.delete('/:id', eliminarPlanillero);
router.get('/:id',obtenerPlanillero);
router.put('/:id', actualizarPlanillero);

// Obtener un planillero por ID

// Actualizar un planillero

// Eliminar un planillero

export default router
