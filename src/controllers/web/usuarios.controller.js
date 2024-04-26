import { tokenizeUserInCookie } from "../../middlewares/tokens.js";
import { usuariosService } from "../../services/usuarios.service.js"

export async function resetPassLinkController(req, res) {
    const token = req.query.token
    try {
        const user = await usuariosService.getOne({resetPassToken:token})
        req.user = user;
        const userToFront = {...user}
        delete userToFront.password    
        if (Date.now() < user.resetPassTokenExpires){
            tokenizeUserInCookie(req, res, () => {
                res.render("resetPassForm.handlebars", { pageTitle: "resetPassForm" });
            });
        }else{
            throw new Error('token is expired')
        }
        // res.status(200).json('ahora estás como logeado y puedo mandarte un formulario para que crees nuevo pass')
    } catch (error) {
        res.status(400).json({message:error.message})
    }
  }

  