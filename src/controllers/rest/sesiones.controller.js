import { newError, ERROR_TYPE } from "../../errors/errors.js";
import { deleteTokenFromCookie, tokenizeUserInCookie } from "../../middlewares/tokens.js";
import { usuariosService } from "../../services/usuarios.service.js";

export const gerCurrentController = async (req, res, next) => {
  const user = { ...req.user };
  if (user) {
    delete user.password;
    res.result(user);
  } else {
    throw newError({ ...ERROR_TYPE.INTERNAL_ERROR });
  }
};

export const deleteController = async (req, res, next) => {
  deleteTokenFromCookie(req, res, () => {
    res.deleted();
  });
};

export const autenticarController = async (req, res, next) => {
  try {
    const user = await usuariosService.autenticar(
      req.body.email,
      req.body.password
    );
    req.user = user;
    const userToFront = {...user}
    delete userToFront.password    
    tokenizeUserInCookie(req, res, () => {
      res.status(201).json(userToFront);
    });
  } catch (error) {
    next(error);
  }
};
