import { Router } from "express";
import { geocodeController, getCityFromIp } from "../../controllers/rest/maps.controller.js";

export const mapsRouter = Router();
mapsRouter.get("/:address", geocodeController);
mapsRouter.get("/:ipAddress", getCityFromIp);