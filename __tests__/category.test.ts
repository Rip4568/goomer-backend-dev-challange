// __tests__/categories.test.ts
import request from 'supertest';
import app from '../src/app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Categories', () => {
  beforeAll(async () => {
    // Limpe o banco de dados antes de executar os testes
    await prisma.category.deleteMany({});
  });

  afterAll(async () => {
    // Limpe o banco de dados depois de executar os testes
    await prisma.category.deleteMany({});
    await prisma.$disconnect();
  });

  describe('GET /api/categories', () => {
    it('should return an empty array when there are no categories', async () => {
      const response = await request(app).get('/api/categories');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('should return an array of categories', async () => {
      const category1 = await prisma.category.create({
        data: {
          name: 'Food',
        },
      });

      const category2 = await prisma.category.create({
        data: {
          name: 'Drink',
        },
      });

      const response = await request(app).get('/api/categories');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body).toContainEqual({
        id: category1.id,
        name: category1.name,
      });
      expect(response.body).toContainEqual({
        id: category2.id,
        name: category2.name,
      });
    });
  });
});