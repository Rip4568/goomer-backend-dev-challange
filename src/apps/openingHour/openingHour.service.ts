import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { openingHourSchema } from './openingHour.schema';

const prisma = new PrismaClient();

export async function openingHourServiceGetAll(request: Request, response: Response) {
  try {
    const { restaurantId } = request.params;
    const openingHours = await prisma.openingHour.findMany({
      where: { restaurantId: Number(restaurantId) },
    });
    return response.json(openingHours);
  } catch (error) {
    return response.status(500).json({ error });
  }
}

export async function openingHourServiceCreate(request: Request, response: Response) {
  try {
    const { restaurantId } = request.params;
    const openingHourData = request.body;
    const openingHourValidated = await openingHourSchema.validate({ ...openingHourData, restaurantId }, { abortEarly: false });
    const openingHour = await prisma.openingHour.create({
      data: { ...openingHourValidated },
    });
    return response.status(201).json(openingHour);
  } catch (error) {
    return response.status(500).json({ error });
  }
}

export async function openingHourServiceUpdate(request: Request, response: Response) {
  try {
    const { id } = request.params;
    const openingHourData = request.body;
    const openingHourValidated = await openingHourSchema.validate(openingHourData, { abortEarly: false });
    const openingHour = await prisma.openingHour.update({
      where: { id: Number(id) },
      data: { ...openingHourValidated },
    });

    if (!openingHour) {
      return response.status(404).json({ error: 'Horário de funcionamento não encontrado' });
    }

    return response.json(openingHour);
  } catch (error) {
    return response.status(500).json({ error });
  }
}

export async function openingHourServiceDelete(request: Request, response: Response) {
  try {
    const { id } = request.params;
    const openingHour = await prisma.openingHour.delete({
      where: { id: Number(id) },
    });

    if (!openingHour) {
      return response.status(404).json({ error: 'Horário de funcionamento não encontrado' });
    }

    return response.json({ message: 'Horário de funcionamento excluído com sucesso' });
  } catch (error) {
    return response.status(500).json({ error });
  }
}