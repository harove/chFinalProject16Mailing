import { Router } from 'express'
import { getByIdController, getController } from '../../controllers/web/products.controller.js';
import { soloRoles } from '../../middlewares/authorization.js';
import passport from 'passport';
import { authService } from '../../services/auth.service.js';

export const productsRouter = Router()

productsRouter.get('/products', getController);
productsRouter.get('/products/:id', getByIdController);

