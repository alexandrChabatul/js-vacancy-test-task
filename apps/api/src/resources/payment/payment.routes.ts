import { routeUtil } from 'utils';

import getPaymentUrl from './actions/get-payment-url';

const publicRoutes = routeUtil.getRoutes([]);

const privateRoutes = routeUtil.getRoutes([getPaymentUrl]);

const adminRoutes = routeUtil.getRoutes([]);

export default {
  publicRoutes,
  privateRoutes,
  adminRoutes,
};
