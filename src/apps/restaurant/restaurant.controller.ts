//src/apps/restaurant/restaurant.controller.ts

import { Router } from "express";
import {
  restaurantServiceCreate,
  restaurantServiceDelete,
  restaurantServiceGetAll,
  restaurantServiceGetOne,
  restaurantServiceeUpdate,
} from "./restaurant.service";

const restaurantController = Router();
restaurantController.get("/", restaurantServiceGetAll);

restaurantController.get("/:id", restaurantServiceGetOne);

restaurantController.post("/", restaurantServiceCreate);

restaurantController.put("/:id", restaurantServiceeUpdate);

restaurantController.delete("/:id", restaurantServiceDelete);

export default restaurantController;
