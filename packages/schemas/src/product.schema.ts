import { z } from 'zod';

import dbSchema from './db.schema';

export const productSchema = dbSchema
  .extend({
    imageUrl: z.string(),
    title: z.string(),
    price: z.number(),
  })
  .strict();
