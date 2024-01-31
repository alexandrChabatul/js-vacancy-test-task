import { z } from 'zod';

import { AppKoaContext, AppRouter, PaymentStatus, PopulatedCartItem } from 'types';

import { validateMiddleware } from 'middlewares';
import { analyticsService } from 'services';
import { productSchema } from 'schemas';
import { paymentService } from 'resources/payment';

const schema = z.object({
  products: z.array(z.object({
      product: productSchema,
      quantity: z.number(),
    })),
});

interface ValidatedData extends z.infer<typeof schema> {
  products: PopulatedCartItem[];
}

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { products } = ctx.validatedData;
  const { user } = ctx.state;

  const session = await paymentService.createPaymentSession(products, user);

  await paymentService.insertOne({
    userId: user._id,
    sessionId: session.id,
    products,
    status: PaymentStatus.PENDING,
  });

  analyticsService.track('Create payment session', {
    userId: user._id,
    sessionId: session.id,
  });

  ctx.body = { url: session.url };
}

export default (router: AppRouter) => {
  router.post('/create-session', validateMiddleware(schema), handler);
};
