import { z } from 'zod';

import { ProductStatus } from 'enums';
import dbSchema from './db.schema';

export const productSchema = dbSchema
  .extend({
    photoUrl: z.string(),
    title: z.string(),
    price: z.number(),
    status: z.nativeEnum(ProductStatus),
    userId: z.string(),
  })
  .strict();
