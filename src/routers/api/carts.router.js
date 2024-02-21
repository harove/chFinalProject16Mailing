import { Router } from 'express';
import { getController, postController, getByIdController, updateController, deleteController, addProductToCartController, deleteProductFromCartController, updateQuantityOfProductFromCartController, deleteAllProductsFromCartController, makePurchaseTicketController } from '../../controllers/rest/carts.controller.js';
import { authService } from '../../services/auth.service.js';
import { soloRoles } from '../../middlewares/authorization.js';
export const cartsRouter = Router()
cartsRouter.get('/:id', getByIdController)
cartsRouter.get('/', getController)
cartsRouter.post('/:cid/products/:pid', authService.authenticate('local'), soloRoles(['user']), addProductToCartController)
cartsRouter.delete('/:cid/products/:pid', authService.authenticate('local'), soloRoles(['user']), deleteProductFromCartController)
cartsRouter.put('/:cid/products/:pid', updateQuantityOfProductFromCartController)
cartsRouter.delete('/:cid/products', deleteAllProductsFromCartController)
cartsRouter.post('/:cid/purchase', authService.authenticate('local'), makePurchaseTicketController)
cartsRouter.post('/', postController)
cartsRouter.put('/:id', updateController)
cartsRouter.delete('/:id', deleteController)