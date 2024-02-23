import { getDaoProducts } from "../dao/products/products.dao.js"
import { Product } from "../models/product.model.js"

const productsDao = await getDaoProducts()
class ProductsService {
    async add(requestBody) {
        const product = new Product(requestBody)
        console.log(product.toPojo())
        return await productsDao.add(product.toPojo())
    }

    async find(query) {
        return await productsDao.find(query)
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