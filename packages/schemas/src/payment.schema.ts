import { z } from 'zod';

import { PaymentStatus } from 'enums';
import dbSchema from './db.schema';
import { productSchema } from './product.schema';

export const paymentSchema = dbSchema
  .extend({
    userId: z.string(),
    status: z.nativeEnum(PaymentStatus),
    products: z.array(productSchema),
  })
  .strict();
