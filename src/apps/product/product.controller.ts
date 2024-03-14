import { Router } from 'express';
import {
  productServiceCreate,
  productServiceDelete,
  productServiceGetAll,
  productServiceUpdate,
} from './product.service';

const productController = Router();

productController.get('/:restaurantId/products', productServiceGetAll);
productController.post('/:restaurantId/products', productServiceCreate);
productController.put('/products/:id', productServiceUpdate);
productController.delete('/products/:id', productServiceDelete);

export default productController;