import { z } from 'zod';

import { AppKoaContext, AppRouter, ProductStatus } from 'types';

import { validateMiddleware } from 'middlewares';
import { productService } from '..';

const schema = z.object({
  page: z.string().transform(Number).default('1'),
  perPage: z.string().transform(Number).default('6'),
  sort: z
    .object({
      createdOn: z.enum(['asc', 'desc']),
    })
    .default({ createdOn: 'desc' }),
  filter: z
    .object({
      price: z
        .object({
          from: z.string().optional(),
          to: z.string().optional(),
        })
        .nullable()
        .default(null),
    })
    .nullable()
    .default(null),
  searchValue: z.string().default(''),
});

type ValidatedData = z.infer<typeof schema>;

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { perPage, page, sort, searchValue, filter } = ctx.validatedData;
  await new Promise((resolve) => setTimeout(resolve, 50000));

  const validatedSearch = searchValue.split('\\').join('\\\\').split('.').join('\\.');
  const regExp = new RegExp(validatedSearch, 'gi');

  const products = await productService.find(
    {
      $and: [
        {
          $or: [{ title: { $regex: regExp } }],
        },
        filter?.price
          ? filter.price.from && filter.price.to
            ? {
                price: {
                  $gte: Number(filter.price.from),
                  $lt: Number(filter.price.to),
                },
              }
            : filter.price.from
            ? {
                price: {
                  $gte: Number(filter.price.from),
                },
              }
            : {
                price: {
                  $lt: Number(filter.price.to),
                },
              }
          : {},
        {
          status: ProductStatus.SALE,
        },
      ],
    },
    { page, perPage },
    { sort }
  );

  ctx.body = {
    items: products.results,
    totalPages: products.pagesCount,
    count: products.count,
  };
}

export default (router: AppRouter) => {
  router.get('/', validateMiddleware(schema), handler);
};
