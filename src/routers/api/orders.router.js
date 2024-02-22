import { Router } from 'express';
import { makePurchaseTicketController } from '../../controllers/rest/orders.controller.js';
import { authService } from '../../services/auth.service.js';


export const ordersRouter = Router()
ordersRouter.post('/:cid',authService.authenticate('local'), makePurchaseTicketController)