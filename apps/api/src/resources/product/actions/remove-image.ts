import { z } from 'zod';

import { AppKoaContext, AppRouter } from 'types';

import { firebaseStorageService } from 'services';
import { validateMiddleware } from 'middlewares';

const schema = z.object({
  url: z.string().url(),
});

interface ValidatedData extends z.infer<typeof schema> {
  url: string;
}

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { url } = ctx.validatedData;

  await firebaseStorageService.deleteFile(url);

  ctx.status = 204;
  ctx.body = {};
}

export default (router: AppRouter) => {
  router.post('/photo/remove', validateMiddleware(schema), handler);
};
