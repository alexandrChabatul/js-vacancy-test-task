import { z } from 'zod';

import { AppKoaContext, AppRouter, PaymentStatus, Product } from 'types';

import { validateMiddleware } from 'middlewares';
import { analyticsService } from 'services';
import { productSchema } from 'schemas';
import { paymentService } from 'resources/payment';
import { userService } from '../../user';

const schema = z.object({
  products: z.array(productSchema),
});

interface ValidatedData extends z.infer<typeof schema> {
  products: Product[];
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

  await userService.removeProductsFromCart(user._id, products);

  analyticsService.track('Create payment session', {
    userId: user._id,
    sessionId: session.id,
  });

  ctx.body = { url: session.url };
}

export default (router: AppRouter) => {
  router.post('/create-session', validateMiddleware(schema), handler);
};
