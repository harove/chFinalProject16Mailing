import { tokenizeUserInCookie } from "../../middlewares/tokens.js";
import { getEmailService } from "../../services/email/email.service.js";
import { usuariosService } from "../../services/usuarios.service.js";
import {
  generateToken,
  hasheadasSonIguales,
  hashear,
} from "../../utils/criptografia.js";

export async function registrarController(req, res, next) {
  try {
    const user = await usuariosService.registrar(req.body);
    req.user = user;
    tokenizeUserInCookie(req, res, () => {
      res.created(req.user);
    });
    getEmailService().enviar({
      to: user.email,
      subject: "successful registration",
      html: "successful registration",
    });
  } catch (error) {
    next(error);
  }
}

export async function getCurrentController(req, res, next) {
  res.json(req.user);
}

export async function findAllUsersController(req, res, next) {
  try {
    const users = await usuariosService.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
}

export async function forgotPassMailController(req, res) {
  const email = req.body.email;
  try {
    const token = await generateToken();
    const user = await usuariosService.saveResetPassToken(
      email,
      token,
      60000
    );
    const resetButtonHtml = `
      <button class="btn btn-primary">
          <a href="http://localhost:8080/usuarios/reset-password?token=${token}">Reset password page</a>
      </button>
      `;
    await getEmailService().enviar({
      to: email,
      subject: "recuperación de contraseña ecommerce",
      html: resetButtonHtml,
    });
    res.status(200).json("email de recuperación de contraseña enviado");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function resetPassController(req, res) {
  const newPass = hashear(req.body.newPass);
    try {
      if (hasheadasSonIguales(req.body.newPass, req.user.password)) {
        throw new Error("No puedes usar el password anterior");
      }
      
      if (Date.now() < new Date(req.user.resetPassTokenExpires).getTime()) {
        const user = await usuariosService.getOneAndUpdate(
          { email: req.user.email },
          { password: newPass }
        );
        res.status(200).json(user);
      }else{
        res.status(400).json({ message: 'token expired'});
      }


    } catch (error) {
      res.status(400).json({ message: error.message });
    }
}
