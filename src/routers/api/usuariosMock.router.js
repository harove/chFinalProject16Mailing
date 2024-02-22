import { Router } from "express";
import { UsuariosDaoMock } from "../../dao/usuarios/mock/usuarios.dao.mock.js";

export const usuariosMockRouter = Router();

const usuariosDaoMock = new UsuariosDaoMock()

usuariosMockRouter.get('/', async (req,res) => {
  res.json(await usuariosDaoMock.readMany())
})
