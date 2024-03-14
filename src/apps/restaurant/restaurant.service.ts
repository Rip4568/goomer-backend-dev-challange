import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { restaurantSchema } from "./restaurante.schema";

const prisma = new PrismaClient();
/* 

é nos arquivos service que vai todo o grosso da logica principal
*/
export async function restaurantServiceGetOne(request: Request, response: Response) {
  try {
    const { id } = request.params;
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: Number(id) },
      include: {
        products: true,
        openingHours: true,
      },
    });

    if (!restaurant) {
      return response.status(404).json({ error: "Restaurante não encontrado" });
    }

    return response.json(restaurant);
  } catch (error) {
    return response.status(500).json({ error });
  }
}

export async function restaurantServiceGetAll(request: Request, response: Response) {
  try {
    const restaurants = await prisma.restaurant.findMany({
      include: {
        products: true,
        openingHours: true,
      },
    });
    return response.json(restaurants);
  } catch (error) {
    return response.status(500).json({ error });
  }
}

export async function restaurantServiceCreate(request: Request, response: Response) {
  try {
    const restaurantData = request.body;
    const restaurantValidated = await restaurantSchema.validate(restaurantData, { abortEarly: false });
    const restaurant = await prisma.restaurant.create({
      data: { ...restaurantValidated },
    });
    return response.status(201).json(restaurant);
  } catch (error) {
    return response.status(500).json({ error });
  }
}

export async function restaurantServiceUpdate(request: Request, response: Response) {
  try {
    const { id } = request.params;
    const { name, address } = request.body;
    //const restaurantValidated = await restaurantSchema.validate({name, address}, { abortEarly: false });
    //schema reclamando que address é obrigatorio para atualziar porem ele pode ser parcial
    const restaurant = await prisma.restaurant.update({
      where: { id: Number(id) },
      data: {name, address},
    });

    if (!restaurant) {
      return response.status(404).json({ error: "Restaurante não encontrado" });
    }

    return response.json(restaurant);
  } catch (error) {
    return response.status(500).json({ error });
  }
}

export async function restaurantServiceDelete(request: Request, response: Response) {
  try {
    const { id } = request.params;
    const restaurant = await prisma.restaurant.delete({
      where: { id: Number(id) },
    });

    if (!restaurant) {
      return response.status(404).json({ error: "Restaurante não encontrado" });
    }

    return response.json({ message: "Restaurante excluído com sucesso" });
  } catch (error) {
    return response.status(500).json({ error });
  }
}