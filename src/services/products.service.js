import { getDaoProducts } from "../dao/products.dao.js"

const productsDao = await getDaoProducts()

class ProductsService {
    async create(pojo) {
        return await productsDao.create(pojo)
    }

    async paginate(query, options) {
        return await productsDao.paginate(query, options)
    }

    async findById(query) {
        return await productsDao.findById(query)
    }

    async findByIdAndUpdate(id,query,options) {
        return await productsDao.findByIdAndUpdate(id,query,options)
    }
    

    async findByIdAndDelete(id) {
        return await productsDao.findByIdAndDelete(id)
    }
    

    async addproduct(datosProduct) {
        const product = await productsDao.create(datosProduct)
        return product
    }
}

export const productsService = new ProductsService()