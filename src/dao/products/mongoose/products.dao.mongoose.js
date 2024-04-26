export class ProductsDaoMongoose {
  constructor(productsModel) {
    this.productsModel = productsModel;
  }

  async add(pojo) {
    const document = await this.productsModel.create(pojo);
    return document.toObject();
  }

  async find(query) {
    return await this.productsModel.find(query).lean();
  }

  async paginate(query, options) {
    return await this.productsModel.paginate(query, options);
  }

  async findById(query) {
    return await this.productsModel.findById(query).lean();
  }

  async findByIdAndUpdate(id, query, options) {
    return await this.productsModel.findByIdAndUpdate(id, query, options);
  }

  async findByIdAndDelete(id) {
    return await this.productsModel.findByIdAndDelete(id);
  }

  async updateOne(query, data) {
    throw new Error("NOT IMPLEMENTED");
  }

  async updateMany(query, data) {
    throw new Error("NOT IMPLEMENTED");
  }

  async deleteOne(query) {
    throw new Error("NOT IMPLEMENTED");
  }

  async deleteMany(query) {
    throw new Error("NOT IMPLEMENTED");
  }
}
