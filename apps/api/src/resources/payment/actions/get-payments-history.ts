import { AppKoaContext, AppRouter } from 'types';
import paymentService from '../payment.service';

async function handler(ctx: AppKoaContext) {
  const { user } = ctx.state;
  const products = await paymentService.getHistory(user._id);
  ctx.body = {
    products,
  };
}

export default (router: AppRouter) => {
  router.get('/history', handler);
};
