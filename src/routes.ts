// src/routes.ts
import { Router } from 'express';
import restaurantController from './apps/restaurant/restaurant.controller';
import productController from './apps/product/product.controller';
import openingHourController from './apps/openingHour/openingHour.controller';
import categoryController from './apps/category/category.controller';

/* 
é no arquivo routes.ts que eu começo a listar 
todas as rotas possiveis com os controllers
*/
const routes = Router();
routes.use('/api/restaurants', restaurantController);
routes.use('/api/products', productController);
routes.use('/api/openingHours', openingHourController);
routes.use('/api/categories', categoryController);

export default routes;