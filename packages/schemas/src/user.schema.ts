import { z } from 'zod';

import dbSchema from './db.schema';
import { productSchema } from './product.schema';

export const cartItemSchema = z.object({
  product: z.string(),
  quantity: z.number().default(1),
});

export const populatedCartItemSchema = z.object({
  product: productSchema,
  quantity: z.number().default(1),
});

export const userSchema = dbSchema
  .extend({
    email: z.string(),
    passwordHash: z.string().nullable().optional(),

    isEmailVerified: z.boolean().default(false),
    isShadow: z.boolean().optional().nullable(),

    signupToken: z.string().nullable().optional(),
    resetPasswordToken: z.string().nullable().optional(),

    avatarUrl: z.string().nullable().optional(),
    oauth: z
      .object({
        google: z.boolean().default(false),
      })
      .optional(),

    lastRequest: z.date().optional(),
    cart: z.array(cartItemSchema).default([]),
  })
  .strict();
