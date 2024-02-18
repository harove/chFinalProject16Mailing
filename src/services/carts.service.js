import { getDaoCarts } from "../dao/carts/carts.dao.js";

const cartsDao = await getDaoCarts();

class CartsService {
  async create(pojo) {
    return await cartsDao.create(pojo);
  }

  async find(query) {
    return await cartsDao.find(query);
  }

  async findById(query) {
    return await cartsDao.findById(query);
  }

  async updateQuantityOfProductsInCart(cid, pid, quantity) {
    return await cartsDao.updateQuantityOfProductsInCart(cid, pid, quantity);
  }

  async findByIdAndUpdate(id, query, options) {
    return await cartsDao.findByIdAndUpdate(id, query, options);
  }

  async findByIdAndDelete(id) {
    return await cartsDao.findByIdAndDelete(id);
  }
}

export const cartsService = new CartsService();
