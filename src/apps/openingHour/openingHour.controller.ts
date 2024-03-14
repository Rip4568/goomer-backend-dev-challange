import { Router } from 'express';
import {
  openingHourServiceCreate,
  openingHourServiceDelete,
  openingHourServiceGetAll,
  openingHourServiceUpdate,
} from './openingHour.service';

const openingHourController = Router();

openingHourController.get('/:restaurantId/opening-hours', openingHourServiceGetAll);
openingHourController.post('/:restaurantId/opening-hours', openingHourServiceCreate);
openingHourController.put('/opening-hours/:id', openingHourServiceUpdate);
openingHourController.delete('/opening-hours/:id', openingHourServiceDelete);

export default openingHourController;