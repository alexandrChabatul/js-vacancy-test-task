import { z } from 'zod';

import { AppKoaContext, Next, AppRouter, Product, User } from 'types';

import { userService } from 'resources/user';

import { validateMiddleware } from 'middlewares';
import { productService } from '../../product';
import { analyticsService } from '../../../services';

type ValidatedData = never;
type Request = {
  params: {
    id: string;
  };
};

async function validator(ctx: AppKoaContext<ValidatedData, Request>, next: Next) {
  const isProductExists = await productService.exists({ _id: ctx.request.params.id });

  ctx.assertError(isProductExists, 'Product not found');

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const productId = ctx.validatedData;
  const { user } = ctx.state;

  const updatedUser = await userService.removeFromCart(user._id, productId);

  analyticsService.track('Remove from cart to cart', {
    productId: productId,
    userId: user._id,
  });

  ctx.body = userService.getPublic(updatedUser);
}

export default (router: AppRouter) => {
  router.post('/cart', validator, handler);
};
