import { Router } from 'express';
import {
  categoryServiceCreate,
  categoryServiceDelete,
  categoryServiceGetAll,
  categoryServiceGetOne,
  categoryServiceUpdate,
} from './category.service';

const categoryController = Router();

categoryController.get('/', categoryServiceGetAll);
categoryController.get('/:id', categoryServiceGetOne)
categoryController.post('/', categoryServiceCreate);
categoryController.put('/:id', categoryServiceUpdate);
categoryController.delete('/:id', categoryServiceDelete);

export default categoryController;