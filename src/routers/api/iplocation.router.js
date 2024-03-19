import { Router } from "express";
import { getCityFromIp } from "../../controllers/rest/maps.controller.js";

export const iplocationRouter = Router();
iplocationRouter.get("/:ipAddress", getCityFromIp);