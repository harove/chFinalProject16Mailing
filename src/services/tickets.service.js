import { getDaoTickets } from "../dao/tickets/tickets.dao.js"

const ticketsDao = await getDaoTickets()
class TicketsService {
    async add(cid, email) {
        return await ticketsDao.add(cid, email)
    }

    async find(query) {
        return await ticketsDao.find(query)
    }

    async paginate(query, options) {
        return await ticketsDao.paginate(query, options)
    }

    async findById(query) {
        return await ticketsDao.findById(query)
    }

    async findByIdAndUpdate(id,query,options) {
        return await ticketsDao.findByIdAndUpdate(id,query,options)
    }
    

    async findByIdAndDelete(id) {
        return await ticketsDao.findByIdAndDelete(id)
    }
    

    async addproduct(datosProduct) {
        const product = await ticketsDao.create(datosProduct)
        return product
    }
}

export const ticketsService = new TicketsService()