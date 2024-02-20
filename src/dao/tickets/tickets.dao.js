import { connect, model } from "mongoose"
import { MODO_EJECUCION, MONGODB_CNX_STR } from "../../config.js"
import { TicketsDaoMongoose } from "./mongoose/tickets.dao.mongoose.js"
import ticketsSchema from "./mongoose/tickets.schema.mongoose.js"

let daoTickets

if (MODO_EJECUCION === 'online') {
    if (!daoTickets) {
      await connect(MONGODB_CNX_STR)
      const ticketsModel = model('tickets', ticketsSchema )
      daoTickets = new TicketsDaoMongoose(ticketsModel)
      console.log('persistiendo tickets en: mongodb')
    }
}

export async function getDaoTickets() {
  return daoTickets
}
