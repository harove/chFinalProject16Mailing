export class Cart {
    #_id
    #products
    constructor() {
        this._id = undefined
        this.products = undefined
    }

    get products(){
        return this.#products
    }

    set products(products){
        this.#products = products
    }

    toPOJO() {
        return {
            _id: this.#_id,
            products: this.#products,
        };
    }
}
