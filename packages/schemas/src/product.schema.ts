import { z } from 'zod';

import dbSchema from './db.schema';

export const productSchema = dbSchema
  .extend({
    photoUrl: z.string(),
    title: z.string(),
    price: z.number(),
    userId: z.string(),
  })
  .strict();
