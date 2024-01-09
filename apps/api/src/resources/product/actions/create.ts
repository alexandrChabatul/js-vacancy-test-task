import { z } from 'zod';

import { AppKoaContext, AppRouter, Product, ProductStatus } from 'types';

import { userService } from 'resources/user';

import { validateMiddleware } from 'middlewares';
import { analyticsService } from 'services';
import { productService } from 'resources/product';

const schema = z.object({
  title: z.string(),
  price: z.number(),
  photoUrl: z.string().url(),
});

interface ValidatedData extends z.infer<typeof schema> {
  product: Product;
}

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { title, price, photoUrl } = ctx.validatedData;
  const { user } = ctx.state;

  const product = await productService.insertOne({
    title,
    price,
    photoUrl,
    userId: user._id,
    status: ProductStatus.SALE,
  });

  await userService.updateOne({ _id: user._id }, (prev) => ({
    products: [...prev.products, product],
  }));

  analyticsService.track('New product created', {
    id: product._id,
  });

  ctx.body = product;
}

export default (router: AppRouter) => {
  router.post('/', validateMiddleware(schema), handler);
};
