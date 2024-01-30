import { Database } from '@paralect/node-mongo';

import { Payment, PaymentStatus, ProductStatus } from 'types';
import { paymentSchema } from 'schemas';
import { DATABASE_DOCUMENTS } from 'app-constants';

const database = new Database(process.env.MONGO_URL as string);

const paymentService = database.createService<Payment>(DATABASE_DOCUMENTS.PAYMENTS, {
  schemaValidator: (obj) => paymentSchema.parseAsync(obj),
});

describe('Payment service', () => {
  beforeAll(async () => {
    await database.connect();
  });

  beforeEach(async () => {
    await paymentService.deleteMany({});
  });

  it('should create payment', async () => {
    const mockProduct = {
      _id: '123asdqwer',
      userId: 'user1235',
      title: 'Test product',
      price: 123.23,
      photoUrl: 'https://test.url',
      status: ProductStatus.SALE,
    };
    const mockPayment = {
      _id: '123asdqwer',
      userId: 'user123',
      status: PaymentStatus.PENDING,
      products: [mockProduct],
    };

    await paymentService.insertOne(mockPayment);

    const insertedProduct = await paymentService.findOne({ _id: mockPayment._id });

    expect(insertedProduct).not.toBeNull();
  });

  afterAll(async () => {
    await database.close();
  });
});
