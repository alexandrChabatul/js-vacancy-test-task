import { Database } from '@paralect/node-mongo';

import { Product } from 'types';
import { productSchema } from 'schemas';
import { DATABASE_DOCUMENTS } from 'app-constants';

const database = new Database(process.env.MONGO_URL as string);

const productsService = database.createService<Product>(DATABASE_DOCUMENTS.PRODUCTS, {
  schemaValidator: (obj) => productSchema.parseAsync(obj),
});

describe('Product service', () => {
  beforeAll(async () => {
    await database.connect();
  });

  beforeEach(async () => {
    await productsService.deleteMany({});
  });

  it('should create product', async () => {
    const mockProduct = {
      _id: '123asdqwer',
      title: 'Test product',
      price: 123.23,
      photoUrl: 'https://test.url',
    };

    await productsService.insertOne(mockProduct);

    const insertedProduct = await productsService.findOne({ _id: mockProduct._id });

    expect(insertedProduct).not.toBeNull();
  });

  afterAll(async () => {
    await database.close();
  });
});
