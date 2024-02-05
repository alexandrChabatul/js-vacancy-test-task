import { z } from 'zod';

import { AppKoaContext, Next, AppRouter } from 'types';

import { userService } from 'resources/user';

import { validateMiddleware } from 'middlewares';
import { analyticsService } from 'services';

const schema = z.object({
  productId: z.string(),
});

interface ValidatedData extends z.infer<typeof schema> {
  productId: string;
}

async function validator(ctx: AppKoaContext<ValidatedData>, next: Next) {
  const { productId } = ctx.validatedData;
  const { user } = ctx.state;
  const product = user.cart.find((i) => i.product === productId);

  ctx.assertError(product, 'Product should be in cart.');

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { productId } = ctx.validatedData;
  const { user } = ctx.state;

  const updatedUser = await userService.decreaseQuantity(user._id, productId);

  analyticsService.track('Decrease cart value', {
    productId: productId,
    userId: user._id,
  });

  ctx.body = userService.getPublic(updatedUser);
}

export default (router: AppRouter) => {
  router.patch('/cart/decrease', validateMiddleware(schema), validator, handler);
};
