export class TicketsDaoMongoose {

  constructor(ticketsModel) {
    this.ticketsModel = ticketsModel
  }

    async add(pojo) {
      const document = await this.ticketsModel.create(pojo)
      return document.toObject()
    }

    async find(query) {
      return await this.ticketsModel.find(query).lean()
    }

    async findById(query) {
        return await this.ticketsModel.findById(query).lean()
    }

    async findByIdAndUpdate(id,query,options) {
        return await this.ticketsModel.findByIdAndUpdate(id,query,options)
    }

    async findByIdAndDelete(id) {
        return await this.ticketsModel.findByIdAndDelete(id)
    }

    async updateOne(query, data) {
      throw new Error('NOT IMPLEMENTED')
    }
  
    async updateMany(query, data) {
      throw new Error('NOT IMPLEMENTED')
    }
  
    async deleteOne(query) {
      throw new Error('NOT IMPLEMENTED')
    }
  
    async deleteMany(query) {
      throw new Error('NOT IMPLEMENTED')
    }
  }