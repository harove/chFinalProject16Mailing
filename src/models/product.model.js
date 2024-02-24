import { newError, ERROR_TYPE } from "../errors/errors.js"

export class Product {
    #_id
    #title
    #description
    #code
    #price
    #status
    #stock
    #category
    #thumbnails
    constructor({_id,  title, description, code, price, status, stock, category, thumbnails}){
        this._id = _id
        this.title = title 
        this.description = description 
        this.code = code 
        this.price = price 
        this.status = status 
        this.stock = stock 
        this.category = category 
        this.thumbnails = thumbnails 
    }

    get title() {
        return this.#title
    }

    get description() {
        return this.#description
    }

    get code() {
        return this.#code
    }

    get price() {
        return this.#price
    }

    get status() {
        return this.#status
    }

    get stock() {
        return this.#stock
    }

    get category() {
        return this.#category
    }
    
    get thumbnails() {
        return this.#thumbnails
    }

    set title(title) {
        if (!title) 
        throw newError({...ERROR_TYPE.INVALID_DATA, message: 'El campo title es requerido' });
        this.#title = title
    }

    set description(description) {
        if (!description) 
        throw newError({...ERROR_TYPE.INVALID_DATA, message: 'El campo description es requerido' });
        return this.#description = description
    }

    set code(code) {
        if (!code)
        throw newError({...ERROR_TYPE.INVALID_DATA, message: 'El campo code es requerido' });
        return this.#code = code
    }

    set price(price) {
        if (!price)
        throw newError({...ERROR_TYPE.INVALID_DATA, message: 'El campo price es requerido' });
        return this.#price = price
    }

    set status(status) {
        return this.#status = status
    }

    set stock(stock) {
        if (!stock)
        throw newError({...ERROR_TYPE.INVALID_DATA, message: 'El campo stock es requerido' });
        return this.#stock = stock
    }

    set category(category) {
        return this.#category = category
    }

    set thumbnails(thumbnails) {
        return this.#thumbnails = thumbnails
    }

    toPojo(){
        return {
            title: this.#title,
            description: this.#description,
            code: this.#code,
            price: this.#price,
            status: this.#status,
            stock: this.#stock,
            category: this.#category,
            thumbnails: this.#thumbnails
        }
    }

}