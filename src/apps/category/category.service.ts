import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { categorySchema } from './category.schema';

const prisma = new PrismaClient();

export async function categoryServiceGetAll(request: Request, response: Response) {
  try {
    const categories = await prisma.category.findMany({
      include: { products: true },
    });
    return response.json(categories);
  } catch (error) {
    return response.status(500).json({ error });
  }
}

export async function categoryServiceCreate(request: Request, response: Response) {
  try {
    const categoryData = request.body;
    const categoryValidated = await categorySchema.validate(categoryData, { abortEarly: false });
    const category = await prisma.category.create({
      data: { ...categoryValidated },
    });
    return response.status(201).json(category);
  } catch (error) {
    return response.status(500).json({ error });
  }
}

export async function categoryServiceUpdate(request: Request, response: Response) {
  try {
    const { id } = request.params;
    const categoryData = request.body;
    const categoryValidated = await categorySchema.validate(categoryData, { abortEarly: false });
    const category = await prisma.category.update({
      where: { id: Number(id) },
      data: { ...categoryValidated },
    });

    if (!category) {
      return response.status(404).json({ error: 'Categoria não encontrada' });
    }

    return response.json(category);
  } catch (error) {
    return response.status(500).json({ error });
  }
}

export async function categoryServiceDelete(request: Request, response: Response) {
  try {
    const { id } = request.params;
    const category = await prisma.category.delete({
      where: { id: Number(id) },
    });

    if (!category) {
      return response.status(404).json({ error: 'Categoria não encontrada' });
    }

    return response.json({ message: 'Categoria excluída com sucesso' });
  } catch (error) {
    return response.status(500).json({ error });
  }
}

export async function categoryServiceGetOne(request: Request, response: Response) {
  try {
    const { id } = request.params;
    const category = await prisma.category.findUnique({
      where: { id: Number(id) },
      include: { products: true },
    });

    if (!category) {
      return response.status(404).json({ error: 'Categoria não encontrada' });
    }

    return response.json(category);
  } catch (error) {
    return response.status(500).json({ error });
  }
}