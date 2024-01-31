import { z } from 'zod';

import { cartItemSchema, userSchema } from 'schemas';

export type User = z.infer<typeof userSchema>;

export type CartItem = z.infer<typeof cartItemSchema>;
