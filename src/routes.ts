// src/routes.ts
import { Router } from 'express';
import restaurantController from './apps/restaurant/restaurant.controller';

const routes = Router();

routes.use('/restaurants', restaurantController);

export default routes;