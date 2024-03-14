// __tests__/restaurants.test.ts
import request from 'supertest';

import  app  from '../src/app'; // Importe sua aplicação Express

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

describe('Restaurants', () => {
  beforeAll(async () => {
    // Limpe o banco de dados antes de executar os testes
    await prisma.restaurant.deleteMany({});
  });

  afterAll(async () => {
    // Limpe os registros relacionados na tabela opening_hours
    await prisma.openingHour.deleteMany({});

    // Agora é seguro excluir os registros na tabela restaurants
    await prisma.restaurant.deleteMany({});
    await prisma.$disconnect();
  });

  describe('GET /api/restaurants', () => {
    it('should return an empty array when there are no restaurants', async () => {
      const response = await request(app).get('/api/restaurants');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('should return an array of restaurants', async () => {
      const restaurant = await prisma.restaurant.create({
        data: {
          photo: 'https://example.com/photo.jpg',
          name: 'Test Restaurant',
          address: '123 Main St',
          openingHours: {
            create: [
              {
                day_of_week: 'Monday',
                hour_open: '09:00:00',
                hour_closed: '17:00:00',
              },
            ],
          },
        },
        include: {
          openingHours: true,
        },
      });

      const response = await request(app).get('/api/restaurants');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0]).toMatchObject({
        id: restaurant.id,
        photo: restaurant.photo,
        name: restaurant.name,
        address: restaurant.address,
        openingHours: restaurant.openingHours,
      });
    });
  });

  // Adicione mais testes para as outras rotas aqui
});