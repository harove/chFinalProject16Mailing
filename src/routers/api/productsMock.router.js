import { Router } from "express";
import { ProductsDaoMock } from "../../dao/products/mock/products.dao.mock.js";

export const productsMockRouter = Router();

const productsDaoMock = new ProductsDaoMock()

productsMockRouter.get('/', async (req,res) => {
  res.json(await productsDaoMock.readMany())
})
