import { AppKoaContext, AppRouter, Next } from 'types';

import { productService } from 'resources/product';
import { firebaseStorageService } from '../../../services';
import { userService } from '../../user';

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

async function handler(ctx: AppKoaContext<ValidatedData, Request>) {
  const product = await productService.findOne({ _id: ctx.request.params.id });
  await Promise.all([
    firebaseStorageService.deleteFile(product!.photoUrl),
    productService.deleteSoft({ _id: ctx.request.params.id }),
    userService.updateOne({ _id: ctx.state.user._id }, (prev) => ({
      products: [...prev.products.filter((p) => p._id !== ctx.request.params.id)],
    })),
  ]);

  ctx.status = 204;
  ctx.body = {};
}

export default (router: AppRouter) => {
  router.delete('/:id', validator, handler);
};
