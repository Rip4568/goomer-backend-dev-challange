import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { productSchema } from './product.schema';

const prisma = new PrismaClient();

export async function productServiceGetAll(request: Request, response: Response) {
  try {
    const { restaurantId } = request.params;
    const products = await prisma.product.findMany({
      where: { restaurantId: Number(restaurantId) },
      include: { category: true },
    });
    return response.json(products);
  } catch (error) {
    return response.status(500).json({ error });
  }
}

export async function productServiceCreate(request: Request, response: Response) {
  try {
    const { restaurantId } = request.params;
    const productData = request.body;
    const productValidated = await productSchema.validate({ ...productData, restaurantId }, { abortEarly: false });
    const product = await prisma.product.create({
      data: { ...productValidated },
    });
    return response.status(201).json(product);
  } catch (error) {
    return response.status(500).json({ error });
  }
}

export async function productServiceUpdate(request: Request, response: Response) {
  try {
    const { id } = request.params;
    const productData = request.body;
    const productValidated = await productSchema.validate(productData, { abortEarly: false });
    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: { ...productValidated },
    });

    if (!product) {
      return response.status(404).json({ error: 'Produto não encontrado' });
    }

    return response.json(product);
  } catch (error) {
    return response.status(500).json({ error });
  }
}

export async function productServiceDelete(request: Request, response: Response) {
  try {
    const { id } = request.params;
    const product = await prisma.product.delete({
      where: { id: Number(id) },
    });

    if (!product) {
      return response.status(404).json({ error: 'Produto não encontrado' });
    }

    return response.json({ message: 'Produto excluído com sucesso' });
  } catch (error) {
    return response.status(500).json({ error });
  }
}