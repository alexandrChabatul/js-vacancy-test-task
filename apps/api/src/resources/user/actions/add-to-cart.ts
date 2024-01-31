import { z } from 'zod';

import { AppKoaContext, Next, AppRouter, Product, User } from 'types';

import { userService } from 'resources/user';

import { validateMiddleware } from 'middlewares';
import { productService } from '../../product';
import { analyticsService } from 'services';

const schema = z.object({
  productId: z.string(),
});

interface ValidatedData extends z.infer<typeof schema> {
  product: Product;
}

async function validator(ctx: AppKoaContext<ValidatedData>, next: Next) {
  const { productId } = ctx.validatedData;
  const product = await productService.findOne({ _id: productId });

  ctx.assertError(product, 'Product not found');
  // ctx.assertError(product.userId !== user._id, "Can't add to cart own products");

  ctx.validatedData.product = product;

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { product } = ctx.validatedData;
  const { user } = ctx.state;

  let updatedUser: User | null;

  const isInCart = user.cart.some((item) => item.product === product._id);
  if (isInCart) updatedUser = await userService.increaseQuantity(user._id, product._id);
  else updatedUser = await userService.addToCart(user._id, product._id);

  analyticsService.track('Add to cart', {
    productId: product._id,
    userId: user._id,
  });

  ctx.body = userService.getPublic(updatedUser);
}

export default (router: AppRouter) => {
  router.post('/cart', validateMiddleware(schema), validator, handler);
};
