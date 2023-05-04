import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { InjectModel } from '@nestjs/mongoose/dist/common';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(title: string, description: string, price: number) {
    const newProduct = new this.productModel({
      title,
      description,
      price,
    });
    const result = await newProduct.save().then();
    return result.id as string;
  }

  async getAllProducts() {
    const products = await this.productModel.find().exec();
    return products.map((prod) => ({
      id: prod.id,
      title: prod.title,
      description: prod.description,
      price: prod.price,
    }));
  }

  async getSingleProduct(productId: string) {
    const product = await this.findProduct(productId);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }

  async updateProduct(
    productId: string,
    title: string,
    desc: string,
    price: number,
  ) {
    const updatedProduct = await this.findProduct(productId);
    updatedProduct.title = title ? title : updatedProduct.title;
    updatedProduct.description = desc ? desc : updatedProduct.description;
    updatedProduct.price = price ? price : updatedProduct.price;
    updatedProduct.save();
  }

  async deleteProduct(prodId: string) {
    let result;
    try {
      result = await this.productModel.deleteOne({ _id: prodId }).exec();
    } catch {
      throw new NotFoundException('Something went wrong');
    }
    if (!result) {
      throw new NotFoundException('Something went wrong');
    }
    console.log(result);
  }

  private async findProduct(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Something went wrong');
    }
    if (!product) {
      throw new NotFoundException('Something went wrong');
    }
    return product;
  }
}
