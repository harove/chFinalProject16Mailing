import { tokenizeUserInCookie } from "../../middlewares/tokens.js";
import { getEmailService } from "../../services/email/email.service.js";
import { usuariosService } from "../../services/usuarios.service.js";

export async function registrarController(req, res, next) {

  try {
    const user = await usuariosService.registrar(req.body);
    req.user = user;
    tokenizeUserInCookie(req, res, () => {
      res.created(req.user);
    });
    getEmailService().enviar({to:'alex@gmail.com',subject:'enviandote mail',html:'hola'})
  } catch (error) {
    next(error);
  }
}

export async function getCurrentController(req, res, next) {
  res.json(req.user);
}

export async function findAllUsersController(req, res, next){
  try {
    const users = await usuariosService.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
};
