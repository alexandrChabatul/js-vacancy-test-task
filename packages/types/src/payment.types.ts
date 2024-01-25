import { z } from 'zod';
import { paymentSchema } from 'schemas';

export type Payment = z.infer<typeof paymentSchema>;
