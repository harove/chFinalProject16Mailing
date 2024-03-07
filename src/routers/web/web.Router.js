import { Router } from "express";
import { cartsWebRouter } from "./carts.web.router.js";
import { onlyLogueadosWeb } from "../../middlewares/autorizacion.js";
import { productsRouter } from "./products.router.js";
import passport from "passport";
import { productsService } from "../../services/products.service.js";
import { logger } from "../../utils/logger.js";

export const webRouter = Router();

webRouter.use(productsRouter);

webRouter.get("/realtimeproducts", async (req, res) => {
  // const products = await manager.findAll(); for files
  const products = await productsService.find({});
  res.render("realTimeProducts.handlebars", {
    products,
    titulo: "Realtime Products",
  });
});

webRouter.get("/chat", (req, res) => {
  res.render("chat.handlebars", { titulo: "Chat" });
});

webRouter.use("/carts", cartsWebRouter);

webRouter.get("/", (req, res) => {
  res.redirect("/profile");
});

webRouter.get("/loggerTest", (req, res) => {
  logger.fatal('fatal error test')
  logger.error('error error test')
  logger.warning('warning error test')
  logger.info('info error test')
  logger.http('http error test')
  logger.debug('debug error test')
  res.redirect("/login")
});

webRouter.get("/register", (req, res) => {
  res.render("register.handlebars", { pageTitle: "Registro" });
});

webRouter.get("/login", (req, res) => {
  res.render("login.handlebars", { pageTitle: "Login" });
});

webRouter.get("/githublogin", passport.authenticate("loginGithub"));

webRouter.get(
  "/githubcallback",
  passport.authenticate("loginGithub", {
    successRedirect: "/profile",
    failureRedirect: "/login",
  })
);

webRouter.get("/profile", (req, res) => {
  res.render("profile.handlebars", {
    pageTitle: "Perfil",
  });
});
