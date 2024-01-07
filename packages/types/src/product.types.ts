import { productSchema } from 'schemas';
import { z } from 'zod';

export type Product = z.infer<typeof productSchema>;
