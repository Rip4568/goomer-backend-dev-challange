//src/apps/restaurant/restaurant.controller.ts

import { Router } from "express";
import {
  restaurantServiceCreate,
  restaurantServiceDelete,
  restaurantServiceGetAll,
  restaurantServiceGetOne,
  restaurantServiceUpdate,
} from "./restaurant.service";

/* aqui vai todos os controlllers, dessa forma organizado fica mais facil a inclsusão
de middlewares ou decoradores */
const restaurantController = Router();

restaurantController.get("/", restaurantServiceGetAll);

restaurantController.get("/:id", restaurantServiceGetOne);

restaurantController.post("/", restaurantServiceCreate);

restaurantController.put("/:id", restaurantServiceUpdate);

restaurantController.delete("/:id", restaurantServiceDelete);

export default restaurantController;
