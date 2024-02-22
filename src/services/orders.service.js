import { getDaoOrders } from "../dao/tickets/orders.dao.js"


const ordersDao = await getDaoOrders()
class OrdersService {
    async add(cid, email) {
        return await ordersDao.add(cid, email)
    }

    async find(query) {
        return await ordersDao.find(query)
    }

    async paginate(query, options) {
        return await ordersDao.paginate(query, options)
    }

    async findById(query) {
        return await ordersDao.findById(query)
    }

    async findByIdAndUpdate(id,query,options) {
        return await ordersDao.findByIdAndUpdate(id,query,options)
    }
    

    async findByIdAndDelete(id) {
        return await ordersDao.findByIdAndDelete(id)
    }
    

    async addproduct(datosProduct) {
        const product = await ordersDao.create(datosProduct)
        return product
    }
}

export const ordersService = new OrdersService()