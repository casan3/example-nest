import { Test, TestingModule } from '@nestjs/testing';
import { Product } from '../entities/product.entity';
import { ProductsService } from '../services/products.service';
import { ProductsController } from './products.controller';
import { generateProduct, generateProducts } from '../fakes/product.fake';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';

describe('ProductsController', () => {
  let productsController: ProductsController;
  const numberOfProducts = 3;
  let products: Product[] = [];

  beforeAll(() => {
    products = generateProducts(numberOfProducts);
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
    })
      .useMocker((token) => {
        if (token === ProductsService) {
          return {
            findAll: jest.fn().mockResolvedValue(products),
            findOne: jest.fn((id: number) => generateProduct({ id })),
            create: jest.fn(() => generateProduct({})),
            update: jest.fn((id: number, changes: UpdateProductDto) =>
              generateProduct({ id, ...changes }),
            ),
          };
        }
      })
      .compile();

    productsController = module.get<ProductsController>(ProductsController);
  });

  describe('getProducts', () => {
    it(`should return an array of products of length ${numberOfProducts}`, async () => {
      const result = await productsController.getProducts(null);

      expect(result).toHaveLength(numberOfProducts);
      expect(result).toEqual(expect.arrayContaining([expect.any(Product)]));
    });
  });

  describe('getOne', () => {
    it(`should return an product with id 1`, async () => {
      const result = await productsController.getOne(1);

      expect(result).toBeInstanceOf(Product);
      expect(result.id).toBe(1);
    });
  });

  describe('create', () => {
    it(`should return a new product`, async () => {
      const result = await productsController.create(new CreateProductDto());

      expect(result).toBeInstanceOf(Product);
    });
  });

  describe('update', () => {
    it(`should return an updated product with id = 1, name = 'Product 1' and price = 300`, async () => {
      const id = 1;
      const payload: UpdateProductDto = {
        name: 'Product 1',
        price: 300,
      };
      const result = await productsController.update(id, payload);

      expect(result).toBeInstanceOf(Product);
      expect(result.id).toBe(id);
      expect(result.name).toBe('Product 1');
      expect(result.price).toBe(300);
    });
  });
});
