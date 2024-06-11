import { Request, Response } from 'express'
import { Prisma, PrismaClient } from '@prisma/client'
import prisma from '../config/database';
import bcrypt from 'bcryptjs';


export const createPlanillero = async (req:Request, res :Response) => {
  const { email, password, nombre } = req.body;
  const { torneoId } = req.params
    console.log(nombre,"nombre")
  try {
    const existingUser = await prisma.usuario.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.usuario.create({
      data: {
        email,
        password: hashedPassword,
        nombre,
        rol: 'planillero', // O el rol que desees por defecto
      },
    });
    console.log(user,"user")
    const planillero = await prisma.planillero.create({
      data: {
        usuarioId : user.id,
        torneoId: Number(torneoId)
      },
      select : {
        usuario : true
      }
    });
    res.status(201).json(planillero);
  } catch (error) {
    res.status(500).json({ error: 'Error creating planillero' });
  }
}

export const obtenerPlanilleros = async (req : Request, res : Response) => {
  try {
    const planilleros = await prisma.planillero.findMany({
      select: {
        usuario:true
      
      },
    });
    res.status(200).json(planilleros);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching planilleros' });
  }
}

export const obtenerPlanillerosPorTorneo = async (req : Request, res : Response) => {
  try {
    const { torneoId } = req.params
    const planilleros = await prisma.planillero.findMany({
      where : {
        torneoId : Number(torneoId)
      },
      select : {
        id: true,
        usuario : {
          select :{
            id: true, 
            nombre : true,
            email : true ,
          }
        }
      }
    });
    res.status(200).json([...planilleros.map( planillero => {
      return {
        ...planillero.usuario,
        id : planillero.id,
        userId : planillero.usuario.id
      }
    })]);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching planilleros' });
  }
}

export const obtenerPlanillero =  async (req:Request, res :Response) => {
  const { id } = req.params;
  try {
    const planillero = await prisma.planillero.findUnique({
      where: { id: parseInt(id) },
      include: {
        usuario: true,
        torneo: true,
      },
    });
    res.status(200).json(planillero);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching planillero' });
  }
}

export const actualizarPlanillero = async (req:Request, res :Response) => {
  const { id } = req.params;
  const { usuarioId, torneoId } = req.body;
  try {
    const planillero = await prisma.planillero.update({
      where: { id: parseInt(id) },
      data: {
        usuarioId,
        torneoId,
      },
    });
    res.status(200).json(planillero);
  } catch (error) {
    res.status(500).json({ error: 'Error updating planillero' });
  }
}


export const eliminarPlanillero = async (req:Request, res :Response) => {
  const { id } = req.params;
  try {
    const planillero = await prisma.planillero.findUnique({
      where: { id: parseInt(id) },
      include: { usuario: true }
    });

    if (!planillero) {
      return res.status(404).json({ error: 'Planillero not found' });
    }

    // Eliminar el usuario asociado
    await prisma.planillero.delete({
      where: { id: parseInt(id) }
    });
    await prisma.usuario.delete({
      where: { id: planillero.usuarioId }
    });

    // Eliminar el planillero
    res.status(204).end();
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Error específico de Prisma
      return res.status(500).json({ error: error.message });
    } else {
      // Error genérico
      return res.status(500).json({ error: 'Error deleting planillero and user' });
    }
  }
}