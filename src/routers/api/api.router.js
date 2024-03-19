import { Router, json, urlencoded } from 'express';
import { productsRouter } from './products.router.js';
import { cartsRouter } from './carts.router.js';
import { sesionesRouter } from './sesiones.router.js';
import { usuariosRouter } from './usuarios.router.js';
import { respuestasMejoradas } from '../../middlewares/respuestasMejoradas.js';
import { usuariosMockRouter } from './usuariosMock.router.js';
import { productsMockRouter } from './productsMock.router.js';
import { ordersRouter } from './orders.router.js';
import { mapsRouter } from './maps.router.js';
import { iplocationRouter } from './iplocation.router.js';


export const apiRouter = Router()


apiRouter.use(respuestasMejoradas)

apiRouter.use(json())
apiRouter.use(urlencoded({extended:true}))

apiRouter.use('/products', productsRouter)
apiRouter.use('/carts', cartsRouter)
apiRouter.use('/sesiones', sesionesRouter)
apiRouter.use('/usuarios', usuariosRouter)
apiRouter.use('/usuariosmock', usuariosMockRouter)
apiRouter.use('/mockingproducts', productsMockRouter)
apiRouter.use('/orders', ordersRouter)
apiRouter.use('/maps', mapsRouter)
apiRouter.use('/iplocation', iplocationRouter)




// apiRouter.use((error, req, res, next) => {
//     switch (error.name){
//         case 'INVALID_ARGUMENT':
//             res.status(400)
//             break
//         case 'FAILED_AUTHENTICATION':
//             res.status(401)
//             break
//         case 'FAILED_AUTHORIZATION':
//             res.status(403)
//             break    
//         case 'INTERNAL_ERROR':
//             res.status(500)
//             break
//         case 'AuthenticationError':
//             res.status(401)
//             break
//         default:
//             console.log('no se que pasó')
//             console.log(JSON.stringify(error,null,2))
//             res.status(500)
//     }



//     res.json({
//         status:'error',
//         message: error.message
//     })
// })