export class Cart {
    #_id
    #products
    constructor({ _id, products }) {
        this._id = _id
        this.products = products
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
