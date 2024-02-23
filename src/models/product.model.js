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
        this.#_id = _id
        this.#title = title 
        this.#description = description 
        this.#code = code 
        this.#price = price 
        this.#status = status 
        this.#stock = stock 
        this.#category = category 
        this.#thumbnails = thumbnails 
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
        if (!title) throw new Error('El title es obligatorio')
        this.#title = title
    }

    set description(description) {
        if (!description) throw new Error('El campo description es obligatorio')
        return this.#description = description
    }

    set code(code) {
        if (!code) throw new Error('El campo code es obligatorio')
        return this.#code = code
    }

    set price(price) {
        if (!price) throw new Error('El campo price es obligatorio')
        return this.#price = price
    }

    set status(status) {
        return this.#status = status
    }

    set stock(stock) {
        if (!price) throw new Error('El campo price es obligatorio')
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