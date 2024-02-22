import { faker } from "@faker-js/faker";

function createProductMock() {
  return {
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    code: faker.string.uuid(),
    price: faker.commerce.price(),
    status: 'true',
    stock: 25,
    category: 'home',
    thumbnails:faker.image.avatar()
  };
}

export class ProductsDaoMock {
  constructor() {
    this.products = [];
  }

  async create(pojo) {
    throw new Error("NOT IMPLEMENTED");
  }

  async readOne() {
    throw new Error("NOT IMPLEMENTED");
  }

  async readMany() {
    const products = []
    for (let index = 0; index < 100; index++) {
        products.push(createProductMock())
    }
    return products;
  }
}
