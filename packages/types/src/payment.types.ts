import { z } from 'zod';
import { paymentSchema, populatedHistoryItemSchema } from 'schemas';

export type Payment = z.infer<typeof paymentSchema>;

export type PopulatedHistoryItem = z.infer<typeof populatedHistoryItemSchema>;
