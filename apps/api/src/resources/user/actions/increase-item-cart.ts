import { z } from 'zod';

import { AppKoaContext, Next, AppRouter, Product } from 'types';

import { userService } from 'resources/user';

import { validateMiddleware } from 'middlewares';
import { analyticsService } from 'services';

const schema = z.object({
  productId: z.string(),
});

interface ValidatedData extends z.infer<typeof schema> {
  product: Product;
}

async function validator(ctx: AppKoaContext<ValidatedData>, next: Next) {
  const { productId } = ctx.validatedData;
  const { user } = ctx.state;
  const product = user.cart.find((i) => i._id == productId);

  ctx.assertError(product, 'Product should be in cart.');

  ctx.validatedData.product = product;

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { product } = ctx.validatedData;
  const { user } = ctx.state;

  const updatedUser = await userService.increaseQuantity(user._id, product);

  analyticsService.track('Increase cart value', {
    productId: product._id,
    userId: user._id,
  });

  ctx.body = userService.getPublic(updatedUser);
}

export default (router: AppRouter) => {
  router.patch('/cart/increase', validateMiddleware(schema), validator, handler);
};
