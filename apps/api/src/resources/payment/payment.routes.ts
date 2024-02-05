import { routeUtil } from 'utils';

import createPaymentUrl from './actions/create-payment-url';
import getPaymentsHistory from './actions/get-payments-history';

const publicRoutes = routeUtil.getRoutes([]);

const privateRoutes = routeUtil.getRoutes([createPaymentUrl, getPaymentsHistory]);

const adminRoutes = routeUtil.getRoutes([]);

export default {
  publicRoutes,
  privateRoutes,
  adminRoutes,
};
