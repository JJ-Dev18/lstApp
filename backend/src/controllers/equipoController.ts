import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

export const getEquipos = async (req: Request, res: Response) => {
  const { torneoId } = req.params;
  try {
    const equipos = await prisma.equipo.findMany({
      where: {
        torneoId: Number(torneoId),
      },
    });

    // Luego contamos los jugadores para cada equipo de manera asincrónica
    const equiposConConteo = await Promise.all(
      equipos.map(async (equipo) => {
        const cantidadJugadores = await prisma.jugador.count({
          where: {
            equipoId: equipo.id,
          },
        });
        return {
          ...equipo,
          jugadores: cantidadJugadores,
        };
      })
    );

    // Devolvemos la lista de equipos con el conteo de jugadores en la respuesta HTTP
    res.status(200).json(equiposConConteo);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getEquiposPorCategoria = async (req: Request, res: Response) => {
  const { categoriaId } = req.params;
  try {
    const equipos = await prisma.equipo.findMany({
      where: { categoriaId: Number(categoriaId) },
    });

    res.json(equipos);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getEquiposPorGrupo = async (req: Request, res: Response) => {
  const { grupoId } = req.params;
  try {
    const equiposGrupos = await prisma.equiposGrupos.findMany({
      where: { grupoId: Number(grupoId) },
      include: { equipo: true },
    });
    const equipos = equiposGrupos.map((eg) => eg.equipo);
    res.json(equipos);
  } catch (error) {
    res.status(500).json({ error: "Error fetching teams for group" });
  }
};
export const getEquipo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const equipo = await prisma.equipo.findUnique({
      where: { id: Number(id) },
    });
    if (!equipo) {
      return res.status(404).json({ error: "Equipo not found" });
    }
    res.json(equipo);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createEquipo = async (req: Request, res: Response) => {
  try {
    const { nombre, categoriaId } = req.body;
    const { torneoId } = req.params;
    const file = req.file;

    if (!file) {
      return res.status(400).send("No se subió ninguna imagen.");
    }
    console.log(req.get('host'))
    console.log(req,"Reqest")


    // const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
    const imageUrl = `${process.env.HOST}/uploads/equipos/${encodeURIComponent(file.filename)}`;

    const newEquipo = await prisma.equipo.create({
      data: {
        nombre,
        categoriaId: Number(categoriaId),
        torneoId: Number(torneoId),
        logo: imageUrl,
      },
    });
    console.log(newEquipo, "newequipo");
    res.status(201).json(newEquipo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateEquipo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, categoriaId } = req.body;

  try {
    const file = req.file;

    // Encuentra el equipo a actualizar
    const equipo = await prisma.equipo.findUnique({
      where: { id: Number(id) },
    });

    if (!equipo) {
      return res.status(404).json({ message: "Equipo no encontrado" });
    }

    let newLogoUrl = equipo.logo;

    if (file) {
      // Extraer la parte relevante de la URL para obtener la ruta relativa
      if (equipo.logo) {
        const oldLogoPath = equipo.logo?.replace(
          `${req.protocol}://${req.get("host")}/`,
          ""
        );

        // Eliminar el archivo del antiguo logo
        const fullOldPath = path.join(process.cwd(), oldLogoPath);
        if (fs.existsSync(fullOldPath)) {
          fs.unlinkSync(fullOldPath);
        }
        newLogoUrl = `${req.protocol}://${req.get(
          "host"
        )}/uploads/equipos/${encodeURIComponent(file.filename)}`;
      }

      // Guardar la URL del nuevo logo
    }
    const updatedEquipo = await prisma.equipo.update({
      where: { id: Number(id) },
      data: {
        nombre,

        categoria: { connect: { id: Number(categoriaId) } },

        logo: newLogoUrl,
      },
    });
    console.log(updatedEquipo, "updated");
    res.status(200).json(updatedEquipo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteEquipo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const equipo = await prisma.equipo.findUnique({
      where: { id: parseInt(id) },
    });

    if (!equipo) {
      return res.status(404).json({ error: "Equipo no encontrado" });
    }
    if (equipo.logo) {
      const logoPath = equipo.logo.replace(
        `${req.protocol}://${req.get("host")}/`,
        ""
      );

      const fullPath = path.join(__dirname, "../../", logoPath); // Asegúrate de ajustar el path según tu estructura de carpetas
      console.log(fullPath, "fullpath");
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }
    // Eliminar el archivo del logo

    await prisma.equipo.delete({ where: { id: Number(id) } });
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
