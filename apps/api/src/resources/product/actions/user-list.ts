import { AppKoaContext, AppRouter } from 'types';

import { productService } from '..';

async function handler(ctx: AppKoaContext) {
  const { user } = ctx.state;

  const products = await productService.find({
    userId: user._id,
  });

  ctx.body = {
    items: products.results,
    count: products.count,
  };
}

export default (router: AppRouter) => {
  router.get('/my', handler);
};
