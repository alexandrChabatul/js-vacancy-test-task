import { AppKoaContext, AppRouter } from 'types';

import { userService } from 'resources/user';

async function handler(ctx: AppKoaContext) {
  const { user } = ctx.state;

  const cart = await Promise.all(userService.getCart(user));

  ctx.body = { cart };
}

export default (router: AppRouter) => {
  router.get('/cart', handler);
};
