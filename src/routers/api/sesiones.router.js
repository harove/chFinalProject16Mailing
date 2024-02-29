import { Router } from 'express'
import { deleteTokenFromCookie, tokenizeUserInCookie } from '../../middlewares/tokens.js'
import passport from 'passport'
import { usuariosService } from '../../services/usuarios.service.js'
import { authService } from '../../services/auth.service.js'
import { autenticarController, deleteController, gerCurrentController } from '../../controllers/rest/sesiones.controller.js'

export const sesionesRouter = Router()

// sesionesRouter.post('/',
//   passport.authenticate('loginLocal', {
//     failWithError: true
//   }),
//   async (req, res, next) => {
//     res.status(201).json({ status: 'success', message: 'login success' })
//   },
//   (error, req, res, next) => {
//     res.status(401).json({ status: 'error', message: error.message })
//   }
// )

// sesionesRouter.get('/current', soloLogueadosApi, (req, res) => {
//   res.json(req.user)
// })

// sesionesRouter.delete('/current', async (req, res) => {
//   req.session.destroy(err => {
//     res.status(204).json({ status: 'success' })
//   })
// })

sesionesRouter.get('/current', authService.authenticate("local"), gerCurrentController)

sesionesRouter.delete('/current', deleteController)

sesionesRouter.post('/', autenticarController)