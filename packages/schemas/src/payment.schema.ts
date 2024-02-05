import { z } from 'zod';

import { PaymentStatus } from 'enums';
import dbSchema from './db.schema';
import { productSchema } from './product.schema';

export const populatedHistoryItemSchema = z.object({
  product: productSchema,
  quantity: z.number().default(1),
  paidAt: z.date().optional(),
});

export const paymentSchema = dbSchema
  .extend({
    userId: z.string(),
    sessionId: z.string(),
    status: z.nativeEnum(PaymentStatus),
    products: z.array(populatedHistoryItemSchema),
  })
  .strict();
