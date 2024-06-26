import { Router } from 'express';
import { getController, postController, getByIdController, updateController, deleteController, uploadController } from '../../controllers/rest/products.controller.js';
import { soloLogueadosApi } from '../../middlewares/autorizacion.js';
import { soloRoles } from '../../middlewares/authorization.js';
import passport from 'passport';
import { authService } from '../../services/auth.service.js';
import { upload } from '../../middlewares/multer.js';


export const productsRouter = Router()
productsRouter.get('/:id', getByIdController)
productsRouter.get('', getController)
productsRouter.post('', authService.authenticate('local') ,soloRoles(['admin']), postController)
productsRouter.put('/:id', authService.authenticate('local') ,soloRoles(['admin']), updateController)
productsRouter.delete('/:id',authService.authenticate('local') ,soloRoles(['admin']), deleteController)
productsRouter.post('/:id/actualizaciones', updateController)
productsRouter.post('/upload',upload.single('picture'), uploadController)


