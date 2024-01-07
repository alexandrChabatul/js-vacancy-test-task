import multer from '@koa/multer';

import { Next, AppKoaContext, AppRouter } from 'types';

import { userService } from 'resources/user';

import { firebaseStorageService } from 'services';

const upload = multer();

async function validator(ctx: AppKoaContext, next: Next) {
  const { file } = ctx.request;

  ctx.assertClientError(file, { global: 'File cannot be empty' });

  await next();
}

async function handler(ctx: AppKoaContext) {
  const { file } = ctx.request;
  console.log(file);

  const url = await firebaseStorageService.uploadFile(file.filename, file);

  ctx.body = { url };
}

export default (router: AppRouter) => {
  router.post('/photo/upload', upload.single('file'), validator, handler);
};
