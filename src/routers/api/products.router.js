import { Router } from 'express';
import { getController, postController, getByIdController, updateController, deleteController } from '../../controllers/rest/products.controller.js';
import { soloLogueadosApi } from '../../middlewares/autorizacion.js';
import { soloRoles } from '../../middlewares/authorization.js';
import passport from 'passport';
import { authService } from '../../services/auth.service.js';


export const productsRouter = Router()
productsRouter.get('/:id', getByIdController)
productsRouter.get('', getController)
productsRouter.post('', postController)
productsRouter.put('/:id', updateController)
productsRouter.delete('/:id',authService.authenticate('local') ,soloRoles(['admin']), deleteController)
productsRouter.post('/:id/actualizaciones', updateController)

