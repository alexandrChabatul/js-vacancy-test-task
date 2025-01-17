import { z } from 'zod';

import { AppKoaContext, Next, AppRouter } from 'types';
import { EMAIL_REGEX } from 'app-constants';

import { userService } from 'resources/user';

import { validateMiddleware } from 'middlewares';

const schema = z.object({
  email: z.string().regex(EMAIL_REGEX, 'Email format is incorrect.'),
});

type ValidatedData = z.infer<typeof schema>;
type Request = {
  params: {
    id: string;
  };
};

async function validator(ctx: AppKoaContext<ValidatedData, Request>, next: Next) {
  const isUserExists = await userService.exists({ _id: ctx.request.params.id });

  ctx.assertError(isUserExists, 'User not found');

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData, Request>) {
  const { email } = ctx.validatedData;

  const updatedUser = await userService.updateOne({ _id: ctx.request.params?.id }, () => ({
    email,
  }));

  ctx.body = userService.getPublic(updatedUser);
}

export default (router: AppRouter) => {
  router.put('/:id', validator, validateMiddleware(schema), handler);
};
