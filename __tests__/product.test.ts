// __tests__/products.test.ts
import request from 'supertest';
import app from '../src/app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Products', () => {
  let restaurantId: number;
  let categoryId: number;

  beforeAll(async () => {
    // Limpe o banco de dados antes de executar os testes
    await prisma.product.deleteMany({});
    await prisma.restaurant.deleteMany({});

    // Crie um restaurante para usar nos testes
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
    restaurantId = restaurant.id;
    // crie uma categoria para usar nos testes
    const category = await prisma.category.create({
      data: {
        name: 'Test Category',
      }
    })
    categoryId = category.id;
  });

  

  afterAll(async () => {
    // Limpe o banco de dados depois de executar os testes
    await prisma.openingHour.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.restaurant.deleteMany({});
    await prisma.$disconnect();
  });

  describe('GET /api/restaurants/:restaurantId/products', () => {
    it('should return an empty array when there are no products', async () => {
      const response = await request(app).get(`/api/restaurants/${restaurantId}/products`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('should return an array of products', async () => {
      const product = await prisma.product.create({
        data: {
          photo: 'https://example.com/product.jpg',
          name: 'Test Product',
          price: 9.99,
          categoryId: categoryId,
          restaurantId,
        },
      });

      const response = await request(app).get(`/api/restaurants/${restaurantId}/products`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0]).toMatchObject({
        id: product.id,
        photo: product.photo,
        name: product.name,
        price: product.price,
        categoryId: product.categoryId,
        restaurantId: product.restaurantId,
      });
    });
  });

  describe('POST /api/restaurants/:restaurantId/products', () => {
    it('should create a new product', async () => {
      const response = await request(app)
        .post(`/api/restaurants/${restaurantId}/products`)
        .send({
          photo: 'https://example.com/new-product.jpg',
          name: 'New Product',
          price: 14.99,
          category: 'Drink',
        });

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({
        photo: 'https://example.com/new-product.jpg',
        name: 'New Product',
        price: 14.99,
        category: 'Drink',
        restaurantId,
      });
    });
  });

  // Adicione mais testes para as outras rotas aqui
});