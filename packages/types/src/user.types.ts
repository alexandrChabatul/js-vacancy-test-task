import { z } from 'zod';

import { cartItemSchema, populatedCartItemSchema, userSchema } from 'schemas';

export type User = z.infer<typeof userSchema>;

export type CartItem = z.infer<typeof cartItemSchema>;

export type PopulatedCartItem = z.infer<typeof populatedCartItemSchema>;
