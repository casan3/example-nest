import { faker } from '@faker-js/faker';
import { Brand } from '../entities/brand.entity';
import { Category } from '../entities/category.entity';
import { Product } from '../entities/product.entity';

export const generateProduct = (params): Product => {
  const { id, name, price } = params;
  const product = new Product();
  product.id = id ?? faker.datatype.number();
  product.name = name ?? faker.commerce.productName();
  product.brand = new Brand();
  product.categories = [new Category()];
  product.description = faker.commerce.productDescription();
  product.image = faker.image.imageUrl();
  product.price = price ?? Number.parseFloat(faker.commerce.price());
  product.stock = faker.datatype.number();
  product.createdAt = faker.datatype.datetime();
  product.updatedAt = faker.datatype.datetime();

  return product;
};

export const generateProducts = (numberOfProducts: number): Product[] => {
  const products: Product[] = [];
  for (let index = 0; index < numberOfProducts; index++) {
    products.push(generateProduct({}));
  }

  return products;
};
